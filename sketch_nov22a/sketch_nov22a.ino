/* HomeGridX - Single-room controller for ESP32 Components: - PIR sensor (digital) - 2 "appliances" represented by relays (fan + light) - ACS712 current sensor (analog) - MQ-2 gas sensor (analog) - Camera power control via relay - Buzzer (digital / PWM) - Serial debug output Author: ChatGPT (adapt for your wiring & calibration) */ 
#include <Arduino.h>
 /* ======= PIN CONFIG ======= */ 
 const int PIR_PIN = 15;
// digital in 
const int RELAY_LIGHT_PIN = 16;
// relay controlling light 
const int RELAY_FAN_PIN = 17;
// relay controlling fan 
const int RELAY_CAMERA_PIN = 18; 
// relay powering camera 
const int BUZZER_PIN = 19; 
// buzzer (digital or PWM) 
const int ACS712_PIN = 35; 
// ADC pin for ACS712 (GPIO35 = ADC1_CH0) 
const int MQ2_PIN = 32; 
// ADC pin for MQ2 (GPIO32 = ADC1_CH3) 
/* ======= SYSTEM / THRESHOLDS ======= */ 
const unsigned long NO_MOTION_TIMEOUT_S = 10UL; 
// seconds to wait before switching off light+fan 
const float SUPPLY_VOLTAGE = 230.0; 
// mains voltage (set to 120 or 230 as applicable) 
const float POWER_THRESHOLD_WATTS = 1000.0; 
// alarm if power (I * V) exceeds this (tune as needed) 
const int MQ2_THRESHOLD = 350; 
// analog threshold for MQ2 alarm (0-4095 for ESP32 ADC) - tune 
const int ACS712_SAMPLES = 200; 
// number of samples for ACS712 averaging /* ACS712 specifics - tune these for your module variant: - sensitivity_mV_per_A = 185 for ACS712-5A, 100 for 20A variant is ~100 mV/A, etc. - Vref is the mid-point (Vcc/2) reading when no current flows */ 
const float ACS712_SENSITIVITY_MV_PER_A = 185.0; 
// mV per A (change if using 20A variant) 
const float ADC_MAX = 4095.0; 
// ESP32 ADC resolution (12-bit) 
const float ADC_REF_VOLTAGE = 3.3; 
// ESP32 ADC reference (approx) 
/* Relay module wiring logic: - If your relay module is active LOW, set RELAY_ON_STATE = LOW - If active HIGH, set to HIGH */ 
const int RELAY_ON_STATE = LOW; 
const int RELAY_OFF_STATE = HIGH; 
/* ======= INTERNAL STATE ======= */ 
unsigned long lastMotionMillis = 0; 
bool motionPresent = false; 
/* ======= UTILITY ======= */ 
void buzzerBeep(unsigned int ms) 
{ 
    digitalWrite(BUZZER_PIN, HIGH); 
    delay(ms); digitalWrite(BUZZER_PIN, LOW);
    
} 
/* ACS712 reading: returns RMS current (A) approximated by sampling */ 
float readACS712CurrentAmps() 
{   
  // Acquire samples around mid-point 
  long sum = 0; 
  int samples = ACS712_SAMPLES; 
  for (int i = 0; i < samples; ++i) 
  { 
    int raw = analogRead(ACS712_PIN); 
    sum += raw; 
  } 
  float avgRaw = (float)sum / samples;
  // Convert ADC reading to volts 
  float vOut = (avgRaw / ADC_MAX) * ADC_REF_VOLTAGE; 
  // ACS712 outputs Vcc/2 at 0A. Compute offset in volts 
  float vZero = ADC_REF_VOLTAGE / 2.0; 
  float vOffset = vOut - vZero; 
  // Convert volts to mV then to Amps using sensitivity 
  float currentA = (vOffset * 1000.0) / ACS712_SENSITIVITY_MV_PER_A; 
  // current could be negative if direction reversed; magnitude is what matters for power 
  if (currentA < 0) currentA = -currentA; 
  return currentA; 
} 
/* ======= SETUP ======= */ 
void setup() 
{ 
  Serial.begin(115200); 
  delay(100); 
  pinMode(PIR_PIN, INPUT); 
  pinMode(RELAY_LIGHT_PIN, OUTPUT); 
  pinMode(RELAY_FAN_PIN, OUTPUT); 
  pinMode(RELAY_CAMERA_PIN, OUTPUT); 
  pinMode(BUZZER_PIN, OUTPUT); 
  // ADC pins default input; no need for pinMode on ESP32 
  // Initialize relays to ON state (assume devices already on; adjust if you want them off initially) 
  digitalWrite(RELAY_LIGHT_PIN, RELAY_ON_STATE); 
  digitalWrite(RELAY_FAN_PIN, RELAY_ON_STATE); 
  digitalWrite(RELAY_CAMERA_PIN, RELAY_OFF_STATE); 
  // camera starts OFF; will be ON upon motion 
  digitalWrite(BUZZER_PIN, LOW); 
  lastMotionMillis = millis(); 
  Serial.println("HomeGridX initialized"); 
} 
      /* ======= MAIN LOOP ======= */ 

void loop() 
{ 
  unsigned long now = millis(); 
  // 1) Read PIR 
  int pirVal = digitalRead(PIR_PIN); 
  if (pirVal == HIGH) 
  { 
    // motion detected 
    if (!motionPresent) 
    { 
      Serial.println("Motion detected"); 
      motionPresent = true; 
      // When motion detected: ensure camera is powered on 
      digitalWrite(RELAY_CAMERA_PIN, RELAY_ON_STATE); 
      // update last seen time 
      lastMotionMillis = now; 
    } 
    else 
    { 
      // keep updating lastMotionMillis while motion persists 
      lastMotionMillis = now; 
    }
  } 
    else
    { 
      // no motion right now - check timeout below 
      if (motionPresent) 
      { 
        // motion was present earlier; maybe it stopped 
        // we'll wait NO_MOTION_TIMEOUT_S until we consider 'no one' 
        if (now - lastMotionMillis >= (NO_MOTION_TIMEOUT_S * 1000UL)) 
        { 
          Serial.printf("No motion for %u seconds. Turning OFF light & fan, turning OFF camera.\n", (unsigned)NO_MOTION_TIMEOUT_S); 
          motionPresent = false; 
          // turn off appliances 
          digitalWrite(RELAY_LIGHT_PIN, RELAY_OFF_STATE); 
          digitalWrite(RELAY_FAN_PIN, RELAY_OFF_STATE); 
          // turn off camera as well if desired 
          digitalWrite(RELAY_CAMERA_PIN, RELAY_OFF_STATE); 
        } 
      } 
    } 
    // 2) ACS712: measure current and compute power 
    float currentA = readACS712CurrentAmps(); 
    float powerW = currentA * SUPPLY_VOLTAGE; 
    Serial.printf("Current: %.2f A, Estimated Power: %.1f W\n", currentA, powerW); 
    if (powerW > POWER_THRESHOLD_WATTS) 
    { 
      Serial.println(">>> POWER ALERT: Threshold exceeded!"); 
      // short beep and keep reporting buzzerBeep(200); 
      // also you can toggle an LED or send message to server, etc. 
    }
      // 3) MQ-2 gas sensor 
    int mqRaw = analogRead(MQ2_PIN); 
    Serial.printf("MQ2 raw: %d\n", mqRaw); 
    if (mqRaw > MQ2_THRESHOLD) 
    { 
      Serial.println(">>> GAS ALERT: MQ2 threshold exceeded! Buzzer ON."); 
      // continuous buzzer while gas alarm persists (be careful - this is blocking) 
      digitalWrite(BUZZER_PIN, HIGH); 
      // Optionally also switch off relays for safety: // 
      digitalWrite(RELAY_LIGHT_PIN, RELAY_OFF_STATE); // 
      digitalWrite(RELAY_FAN_PIN, RELAY_OFF_STATE); 
    } 
    else 
    { 
      // ensure buzzer is off if no other alert digitalWrite(BUZZER_PIN, LOW);
    } 
 // 4) Small delay for loop pacing 
 delay(500); 
 }

#include <Arduino.h>

/* ---------------- PIN CONFIG ---------------- */
const int PIR_PIN = 15;

const int RELAY_LIGHT_PIN = 16;    // Light relay
const int RELAY_CAMERA_PIN = 18;   // Camera power relay

const int ACS712_PIN = 35;         // Current sensor (optional debug)

/* ---------------- RELAY LOGIC ---------------- */
const int RELAY_ON  = LOW;   // Most relay modules are active LOW
const int RELAY_OFF = HIGH;

/* ---------------- SETTINGS ---------------- */
const unsigned long NO_MOTION_TIMEOUT_S = 10;

/* ---------------- INTERNAL STATE ---------------- */
bool motionDetected = false;
unsigned long lastMotion = 0;

/* ---------------- SETUP ---------------- */

void setup() {
  Serial.begin(115200);
  delay(200);

  pinMode(PIR_PIN, INPUT);

  pinMode(RELAY_LIGHT_PIN, OUTPUT);
  pinMode(RELAY_CAMERA_PIN, OUTPUT);

  // Start with everything OFF
  digitalWrite(RELAY_LIGHT_PIN, RELAY_OFF);
  digitalWrite(RELAY_CAMERA_PIN, RELAY_OFF);

  Serial.println("HomeGridX (minimal version) started.");
}

/* ---------------- MAIN LOOP ---------------- */

void loop() {

  /* --------- PIR Motion Handling --------- */
  int pir = digitalRead(PIR_PIN);

  if (pir == HIGH) {
    if (!motionDetected) {
      Serial.println("Motion detected!");

      motionDetected = true;

      digitalWrite(RELAY_CAMERA_PIN, RELAY_ON);   // Turn camera ON
      digitalWrite(RELAY_LIGHT_PIN, RELAY_ON);    // Turn light ON
    }

    lastMotion = millis();
  }
  else {
    // No motion → check timeout
    if (motionDetected &&
        millis() - lastMotion >= NO_MOTION_TIMEOUT_S * 1000) {

      Serial.println("No motion → Turning OFF camera & light.");

      motionDetected = false;

      digitalWrite(RELAY_CAMERA_PIN, RELAY_OFF);
      digitalWrite(RELAY_LIGHT_PIN, RELAY_OFF);
    }
  }

  /* --------- Optional: ACS712 monitoring --------- */
  int rawCurrent = analogRead(ACS712_PIN);
  Serial.printf("Current sensor raw: %d\n", rawCurrent);

  delay(200);
}
