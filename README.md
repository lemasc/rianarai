# RianArai - เรียนอะไร

> เครื่องมือเดียวสำหรับการเรียนออนไลน์

ยินดีต้อนรับสู่ Repository ของ RianArai แอปพลิเคชันที่จะช่วยให้การเรียนออนไลน์ง่ายขึ้นสำหรับทุกคน

โครงการนี้เดิมถูกออกแบบมาให้ใช้ภายในโรงเรียนมัธยมสาธิตวัดพระศรีมหาธาตุ มรภ. พระนคร แต่จะมีการปรับปรุงเพื่อให้สามารถใช้งานได้กับกลุ่มที่กว้างขึ้น

## โครงสร้าง
ใช้ภาษาหลักเป็น JavaScript และ React ตามลำดับ แอปพลิเคชันสามารถรันได้บน 3 Platform โดยบน Windows จะใช้ Electron และ Next.js (Nextron) ส่วนบน Android และ iOS จะใช้ React Native และ Expo 

## ส่วนประกอบ
Repository นี้เป็นแบบ Monorepo ซึ่งประกอบด้วยหลาย Packages ที่เกี่ยวข้องเข้าด้วยกัน เพื่อให้สามารถใช้และแชร์โค้ดร่วมกันได้ แต่โดยหลัก ๆ ประกอบด้วย 2 โฟลเดอร์

1. `apps` - ประกอบด้วยไฟล์แอพพลิเคชั่นสำหรับแต่ละ Platform
	- `desktop` - ประกอบด้วยโค้ด Desktop (Electron Main Process) เขียนด้วย TypeScript
	- `desktop-client` - ประกอบด้วยโค้ด Desktop (Electron Renderer Process) เขียนด้วย Next.js (TypeScript)
	- `mobile` - ประกอบด้วยโค้ด Mobile (Expo) ใช้ Managed Workflow และ [Custom Development Client](https://docs.expo.dev/development/introduction/)
2. `packages` -  ประกอบด้วยไฟล์โค้ด JavaScript ที่สามารถใช้งานได้รวมกัน ส่วนประกอบสำคัญได้แก่
	- `classroom-client` - หัวใจสำคัญของแอพพลิเคชั่น จัดการการเข้าสู่ระบบกับ Google เชื่อมต่อกับระบบ Google Classroom และอื่น ๆ 
	- `shared` - ประกอบด้วยโค้ด JavaScript ที่ใช้งานร่วมกัน เช่น การเข้าเรียน Firebase และอื่น ๆ 
	- `ui-shared` - ประกอบด้วยโค้ด React ที่ใช้งานร่วมกัน เช่น Context การแสดง Alert และอื่น ๆ

## ลิขสิทธิ์
MIT License