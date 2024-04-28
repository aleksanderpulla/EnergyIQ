#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>
#include <PZEM004Tv30.h>
#include <SoftwareSerial.h>
#include <ArduinoJson.h> 

const char *ssid = "xxx";
const char *password = "yyy";
const char *host = "energy-iq.vercel.app";

SoftwareSerial pzemSWSerial(14, 12);
PZEM004Tv30 pzem(pzemSWSerial);

void setup() {
  delay(1000);
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.println("");
  Serial.print("Connecting");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  float voltage = pzem.voltage();
  float current = pzem.current();
  float power = pzem.power();
  float energy = pzem.energy();
  float frequency = pzem.frequency();

  if (isnan(voltage) || isnan(current) || isnan(power) || isnan(energy) || isnan(frequency)) {
    Serial.println("Error reading data from sensor");
  } else {
    Serial.print("Voltage:  ");
    Serial.print(voltage);
    Serial.println("V");
    Serial.print("Current:  ");
    Serial.print(current);
    Serial.println("A");
    Serial.print("Power:  ");
    Serial.print(power);
    Serial.println("W");
    Serial.print("Energy:  ");
    Serial.print(energy, 3);
    Serial.println("kWh");
    Serial.print("Frequency:  ");
    Serial.print(frequency, 1);
    Serial.println("Hz");

    // Construct JSON object
    StaticJsonDocument<200> doc;
    doc["voltage"] = voltage;
    doc["current"] = current;
    doc["power"] = power;
    doc["energy"] = energy;
    doc["frequency"] = frequency;

    // Serialize JSON object to a string
    String postData;
    serializeJson(doc, postData);

    // Send data
    WiFiClient client;
    HTTPClient http;

    if (http.begin(client, "<host>/api/data")) { 
      http.addHeader("Content-Type", "application/json");
      
      int httpCode = http.POST(postData);
      if (httpCode > 0) {
        Serial.print("HTTP response code: ");
        Serial.println(httpCode);
        String payload = http.getString();
        Serial.println("Response payload: " + payload);
      } else {
        Serial.println("HTTP request failed");
      }
      http.end();
    } else {
      Serial.println("Unable to connect to host");
    }

    delay(2000);
  }
}
