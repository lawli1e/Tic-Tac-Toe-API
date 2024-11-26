# Tic-Tac-Toe Game API

Backend RESTful API สำหรับเกม Tic-Tac-Toe (XO) พัฒนาด้วย Node.js, Express และ MySQL

## Features

- 👥 ระบบสมาชิก (สมัคร/เข้าสู่ระบบ)
- 👀 ดูรายชื่อผู้เล่นในระบบ
- 🎮 ส่งคำท้าเล่นเกม
- ✉️ จัดการคำเชิญ
- 🎯 เล่นเกม XO แบบสลับเทิร์น
- 📊 ดูประวัติและสถิติการเล่น
- 🤖 เล่นกับ Bot (AI Mode)

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL
- **ORM:** Sequelize
- **Authentication:** JWT
- **Password Hashing:** bcryptjs

## Installation

```bash
# Clone repository
git clone https://github.com/yourusername/tic-tac-toe-api.git
cd tic-tac-toe-api

# Install dependencies
npm install

# Config environment
cp .env.example .env
# แก้ไขไฟล์ .env ตามการตั้งค่าของคุณ

# Setup database
npm run db:create
npm run db:migrate

# Start server
npm run dev
```

## Database Structure

![ER Diagram](path/to/er-diagram.png)

### Tables
- Users: เก็บข้อมูลผู้ใช้และสถิติ
- Games: เก็บข้อมูลเกม
- Moves: เก็บประวัติการเดิน
- Invitations: จัดการคำเชิญ

## API Endpoints

### 🔐 Authentication
```http
POST /api/auth/register
Body: { username, email, password }

POST /api/auth/login
Body: { username, password }
```

### 👥 Users
```http
GET /api/users/list      # ดูรายชื่อผู้เล่น
GET /api/users/stats     # ดูสถิติตัวเอง
```

### 🎮 Games
```http
POST /api/games              # สร้างเกมใหม่
GET /api/games/my-games      # ดูประวัติการเล่น
GET /api/games/:gameId       # ดูรายละเอียดเกม
POST /api/games/:gameId/moves # เดินหมาก (position: 0-8)
```

### ✉️ Invitations
```http
POST /api/invitations        # ส่งคำท้า
GET /api/invitations         # ดูคำเชิญที่ได้รับ
POST /api/invitations/:id/accept # ตอบรับคำท้า
```

### 🤖 Bot Mode
```http
POST /api/games/bot          # สร้างเกมกับ Bot
POST /api/games/bot/:gameId/moves # เดินหมากในเกมกับ Bot
```

## Authentication

ใช้ Bearer Token ในการยืนยันตัวตน
```http
Authorization: Bearer <token>
```

## Game Rules

1. ผู้ถูกท้าดวลเป็นผู้เริ่มตาแรกของเกมเสมอ
2. เกมดำเนินไปโดยผู้เล่นสลับกันเล่นทีละตา
3. กระดานมี 9 ช่อง (0-8)
4. Bot Mode ใช้ Minimax Algorithm ในการตัดสินใจ

## Development

```bash
# รันในโหมด development
npm run dev
```

## Testing

ใช้ Postman Collection ที่แนบมาในโปรเจคเพื่อทดสอบ API:
1. Import `postman_collection.json`
2. ตั้งค่า environment variable `baseUrl`
3. Register และ login เพื่อรับ token
4. Set token ใน environment variable
5. ทดสอบ endpoints ต่างๆ

## Project Structure

```
tic-tac-toe-api/
├── src/
│   ├── config/         # Database configuration
│   ├── models/         # Sequelize models
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom middleware
│   ├── routes/         # Route definitions
│   ├── utils/          # Helper functions
│   └── scripts/        # Database scripts
├── .env                # Environment variables
└── server.js          # Application entry point
```

## Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## Author
Pirapong

## Support
ติดต่อ: fnchuuta01@gmail.com