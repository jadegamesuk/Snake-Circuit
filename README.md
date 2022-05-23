# Snake Circuit 
Cloned from the boilerplate template to make this PWA compatible.

## To Do
- ~Create environment and basic level~
- ~Ensure a single sphere can move along cylinder correctly~
- ~Ensure additional spheres can be created correctly~
- Ensure additional spheres can also move correctly
- Add controls via controller
- Screen shake!
- Add apples to eat

## Guide to converting PWA to APK for Oculus (Run from Windows 10 VM)

### Create APK file

C:\Users\Efe\Documents\ovr-platform-util-pwa\ovr-platform-util.exe create-pwa -o V:\test.apk --android-sdk C:\Users\Efe\Documents\build-tools\sdk --manifest-content-file C:\Users\Efe\Documents\Template\manifest.webmanifest
### Send APK to Oculus

C:\Users\Efe\Documents\platform-tools\adb.exe devices
C:\Users\Efe\Documents\platform-tools\adb.exe install V:\test.apk

### Edits

Make changes to the following files:
- manifest.webmanifest
- img folder
- 
