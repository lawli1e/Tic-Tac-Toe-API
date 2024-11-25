# Tic-Tac-Toe API

RESTful API สำหรับเกม Tic-Tac-Toe (XO) พัฒนาด้วย Node.js และ Express

## Features

- ระบบสมาชิก (สมัคร/เข้าสู่ระบบ)
- ดูรายชื่อผู้เล่นทั้งหมด
- ส่งคำท้าเล่นเกม
- จัดการคำเชิญ (รับ/ปฏิเสธ)
- เล่นเกม XO แบบสลับเทิร์น
- ดูประวัติและสถิติการเล่น

## การติดตั้ง

```bash
# Clone repository
git clone https://github.com/yourusername/tic-tac-toe-api.git

# ติดตั้ง dependencies
cd tic-tac-toe-api
npm install

# สร้างไฟล์ .env
cp .env.example .env

# แก้ไขค่าใน .env ตามระบบของคุณ
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=tictactoe_db
JWT_SECRET=your-secret-key

# สร้างฐานข้อมูล
npm run db:create

# สร้างตาราง
npm run db:migrate

# รันเซิร์ฟเวอร์
npm run dev
```

## API Endpoints

### Authentication
```
POST /api/auth/register - สมัครสมาชิก
Body: { username, email, password }

POST /api/auth/login - เข้าสู่ระบบ
Body: { username, password }
```

### Users (Protected Routes)
```
GET /api/users/list - ดูรายชื่อผู้เล่น
GET /api/users/stats - ดูสถิติตัวเอง
```

### Games (Protected Routes)
```
POST /api/games - สร้างเกมใหม่
GET /api/games/my-games - ดูประวัติการเล่น
GET /api/games/:gameId - ดูรายละเอียดเกม
POST /api/games/:gameId/moves - เดินหมาก (position: 0-8)
```

### Invitations (Protected Routes)
```
POST /api/invitations - ส่งคำท้า
GET /api/invitations - ดูคำเชิญที่ได้รับ
POST /api/invitations/:id/accept - ตอบรับคำท้า
```

## Authentication

ใช้ Bearer Token authentication. ใส่ header ดังนี้:
```
Authorization: Bearer <token>
```

## Database Schema

- Users: id, username, email, password, wins, losses, draws
- Games: id, player1_id, player2_id, current_turn_id, status, winner_id, board_state
- Moves: id, game_id, player_id, position
- Invitations: id, sender_id, receiver_id, status

## การพัฒนา

```bash
# รันในโหมด development
npm run dev
```

## เทคโนโลยีที่ใช้

- Node.js
- Express
- MySQL
- Sequelize
- JSON Web Token
- bcryptjs
