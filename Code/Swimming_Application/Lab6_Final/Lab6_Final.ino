
#include <SparkFun_Bio_Sensor_Hub_Library.h>
#include <String.h>
#include <Wire.h>

//PPI sensor
  // No other Address options.
  #define DEF_ADDR 0x55
  // Reset pin, MFIO pin
  const int resPin = 4;
  const int mfioPin = 5;
  // Takes address, reset pin, and MFIO pin.
  SparkFun_Bio_Sensor_Hub bioHub(resPin, mfioPin); 
  bioData body;  


// ANALOG pins
int FSRpin = A0;


// FSR readings 
int FSRVal = 0; 

// Buzzer
int buzzer = 12;

// used for accelometer 
const int xpin = A3; // x-axis of the accelerometer
const int ypin = A1; // y-axis
const int zpin = A2; // z-axis
int x_calib;
int y_calib;
int z_calib;
int prev_x;
int prev_y;
int prev_z;
int x_prevcalib;
int y_prevcalib;
int z_prevcalib;
boolean motion;


// time variables for initial push and realtime reads
unsigned long currentTime, previousTime = 0;

void setup() {
  
Serial.begin(115200);


  // analog FSR
  pinMode(FSRpin, INPUT); 
  pinMode(buzzer, OUTPUT);

  //PPI
  Wire.begin();
  int result = bioHub.begin();
  if (!result)
    Serial.println("Sensor started!");
  else
    Serial.println("Could not communicate with the sensor!!!");

  Serial.println("Configuring Sensor...."); 
  int error = bioHub.configBpm(MODE_ONE); // Configuring just the BPM settings. 
  if(!error){
    Serial.println("Sensor configured.");
  }
  else {
    Serial.println("Error configuring sensor.");
    Serial.print("Error: "); 
    Serial.println(error); 
  }
  // Data lags a bit behind the sensor, if you're finger is on the sensor when
  // it's being configured this delay will give some time for the data to catch
  // up. 
  delay(4000);

int prev_x = analogRead(xpin); //read from xpin
delay(1); //
int prev_y = analogRead(ypin); //read from ypin
delay(1); 
int prev_z = analogRead(zpin); //read from zpin
motion = 0;

x_prevcalib = (((float)prev_x - 331.5)/65*9.8);
y_prevcalib =(((float)prev_y - 329.5)/68.5*9.8);
z_prevcalib = (((float)prev_z - 340)/68*9.8);
}




void loop() {
  noTone(buzzer);
  // update time
  currentTime = millis();

  //PPI    
    //Serial.println("Reading Sensor");
    body = bioHub.readBpm();
    String heartRate = String(body.heartRate);   //li trasforma in stringhe e poi li unisce in una unica
    String confidence = String(body.confidence);
    String oxygen = String(body.oxygen);
    String readStatus = String(body.status);
    String currentTimeStrng = String(currentTime);
    String PPIcombined = heartRate + "," + confidence + "," + oxygen + "," + readStatus + "," + currentTimeStrng;
    //Serial.println(PPIcombined);
  
  // read from FSR 
  FSRVal = analogRead(FSRpin);

//accelerometer
int x = analogRead(xpin); //read from xpin
delay(1); //
int y = analogRead(ypin); //read from ypin
delay(1); 
int z = analogRead(zpin); //read from zpin

x_calib = (((float)x - 331.5)/65*9.8);
y_calib =(((float)y - 329.5)/68.5*9.8);
z_calib = (((float)z - 340)/68*9.8);

if (abs(x_prevcalib - x_calib) > 10 || abs(y_prevcalib - y_calib) > 10 || abs(z_prevcalib - z_calib) > 10) {
  motion = 1;
}
else {
  motion = 0;
}

prev_x = x_calib;
prev_y = y_calib;
prev_z = z_calib;
                   
   
 // print out data after short delay to ensure valid data is being sent
  if ((currentTime - previousTime) >= 100) {
    previousTime = currentTime;
    
    String toPrint = String(FSRVal) + "$" + String(motion) + "$" + String(PPIcombined);
    if (Serial.available() > 0) { // If data is available to read,
      char val = Serial.read();
      if(val == 'B'){
        tone(buzzer,1000,250);
      }

      if(val = 'S'){
        tone(buzzer,2000,1000);
      }
    }
    //
    
    Serial.print(toPrint);
    Serial.println();
  }

  delay(500); // short delay between reads
}
