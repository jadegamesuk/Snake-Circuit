# Snake Circuit ![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![HTML5](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
## Connect with me:
[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://uk.linkedin.com/in/efe-enobakhare)

## Description
Working to create a free VR Snake game. Utilising javascript and Aframe to get things working. Cloned from the boilerplate template to make this PWA compatible. This is a project that I created to work on my JavaScript skills. Somewhat buggy but a fun project to test out WebXR technology

## Demo
![SnakeVR](https://github.com/jadegamesuk/Snake-Circuit/assets/39485724/64a6373b-e0f9-4c5c-be26-66ea25ed7f52)



## To Do
- ~Create environment and basic level~
- ~Ensure a single sphere can move along cylinder correctly~
- ~Ensure additional spheres can be created correctly~
- Ensure additional spheres can also move correctly
- Add controls via controller
- Add apples to eat

### Instructions to convert PWA to APK for Oculus (Windows)

#### Create APK file

ovr-platform-util.exe create-pwa -o test.apk --android-sdk build-tools\sdk --manifest-content-file Template\manifest.webmanifest

#### Send APK to Oculus

adb.exe devices
adb.exe install test.apk
