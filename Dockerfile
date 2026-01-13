# ใช้ nginx เป็น web server
FROM nginx:alpine

# ลบ config default ของ nginx
RUN rm -rf /usr/share/nginx/html/*

# copy ไฟล์ build ของ React ไปไว้ใน nginx
COPY dist /usr/share/nginx/html

# เปิด port 80
EXPOSE 80

# สั่ง nginx รัน
CMD ["nginx", "-g", "daemon off;"]

