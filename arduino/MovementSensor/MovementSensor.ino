/* 
 * Let´s implement a movement sensor.
 * 
 */
 
long unsigned int pause = 1000;  
long unsigned int calibrationTime = 5;

int pirPin = 7;    //the digital pin connected to the PIR sensor's output

//SETUP
void setup(){
  Serial.begin(9600);
  pinMode(pirPin, INPUT);
  digitalWrite(pirPin, LOW);

  //give the sensor some time to calibrate
  Serial.print("Calibrating Sensor, please wait.");
    for(int i = 0; i < calibrationTime; i++) {
      Serial.print(".");
      delay(pause);
    }
    Serial.println("SENSOR ACTIVE");
    delay(pause);
  }

void loop(){

  if(digitalRead(pirPin) == HIGH){
    Serial.println("{\"motion\": true}");
   }

  if(digitalRead(pirPin) == LOW){       
    Serial.println("{\"motion\": false}");
  }
  delay(pause);
}

