module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [
      {
        name: 'OPPO A15 Smartphone 3GB/32GB (Garansi Resmi) - Hitam',
        description: `Deskripsi OPPO A15 Smartphone 3GB/32GB (Garansi Resmi) - Hitam
Dimensions/Weight
Height: 164.0 mm
Width: 75.4 mm
Thickness: 7.9 mm
Weight: Approximately 175 g (With Battery)

Basic Parameters
Color: Black, White
Operating System: ColorOS 6.12, based on Android 9
CPU: MediaTek Helio P35
CPU Frequency: 4*1.8GHz+4*2.3GHz
GPU: IMG GE8320@680 MHz 10.2 fps
Battery: 4100/4230mAh (Min/Typ)
RAM: 3GB
Storage: 32GB
External Memory: Supported
OTG: Supported
Fingerprint: Back fingerprint
Face Recognition: Yes

Display
Size: 16.55 cm (6.52'')
Touchscreen: Multi-touch, Capacitive Screen
Resolution: 1600 x 720 pixels (HD+)
Colors: 16 million colors
Screen Ratio: 88.7%
Refresh Rate: 60Hz
Glass type of touch panel : Corning Gorilla Glass 3
No stroboscopic eye protection: Supported
Split screen: Supported
Picture in picture: Supported

Camera
Front Sensor: 8MP Waterdrop notch
Flash: Screen lighting supplementary

Rear Camera: 13MP Main Camera + 2MP Mono + 2MP Macro
Zoom: 5x Digital Zoom
Flash: Single color temperature

Video format: MP4

Aperture:
Front: f/2.4
Rear: f/2.2 + f/2.4


Mode:
Photo, video, professional mode, panorama, portrait, time-lapse photography, AR stickers

Pixel Size:
Rear camera: 3072X4096（default）, 3072X3072, 1800X4000
Front camera: 2448X3264（default），2448X2448，1440X3200
Video:
Front Camera: 1080P/720P@30 fps (Default: 720P@30 fps; beautification turned off)
Video zoom or slow motion is not supported by the front camera.
Rear Camera: 1080P@30fps and 720P@30fps (1080p@30fps by default); Slow-motion with 720P@90fps; Video zoom with 1080P@30fps and 720P@30fps

Connectivity
Frequencies:
GSM: 850/900/1800/1900MHz
WCDMA: Bands 1/5/8
FDD-LTE: Bands 1/3/5/8
TD-LTE: Bands 38/40/41
SIM Card Type: Dual Nano-SIM card
GPS: Built-in GPS; supports A-GPS, Beidou, Glonass, GALILEO
Bluetooth: 5.0
WLAN Function: WLAN 2.4G， WLAN 5.1G ， WLAN 5.8G , WLAN Display
NFC: No
Micro USB 2.0

In The Box

OPPO A15*1

Adapter*1

Micro USB Cable*1

Important Info. Booklet with Warranty Card *1

Quick Start Guide *1

SIM Card Tool *1

Case *1`,
        quantity: 100,
        price: 1999000,
        weight: 10000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
