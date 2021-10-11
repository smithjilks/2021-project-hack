# SES-BOARD

Info on the board [SES Dev Board](https://github.com/JKUATSES/sesBoardv1)

## Pin Out

| SES Dev Board | RFID reader | 
|---------------|-------------|
|    22         |      Rst    |
|    5          |      SDA    |
|    18         |      SCK    |
|    19         |     MISO    |
|    23         |     MOSI    |
|   3.3V        |     3.3v    |
|   GND         |     GND     |

## RFID
### Basics of RFID tags

Each tag has a Unique ID (UID), a read and writable memory. The UID is a 8-bit array as shown below:

![UIDs](https://github.com/smithjilks/2021-project-hack/blob/stud-auth/Software/stud-auth/board/imgs/uids.png)

## Project

The project takes advantage of the UIDs.