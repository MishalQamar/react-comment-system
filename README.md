# Polymorphic Comment System

A production-ready, drop-in comment system built with Next.js 14, React Server Components, and Prisma. This system supports polymorphic relationships, allowing comments to be attached to any entity type in your application.

## 🚀 Live Demo

- [Article Comments Demo](/article)
- [Episode Comments Demo](/episode)

## ✨ Key Features

- **Polymorphic Design**: Attach comments to any entity type (articles, episodes, products, etc.)
- **Threaded Replies**: Nested comment threads with infinite depth
- **Real-time Updates**: Built with React Server Components for optimal performance
- **Drop-in Integration**: Simple two-prop integration (`entity` and `entityId`)
- **Full CRUD Operations**: Create, read, update, and delete comments
- **User Authentication**: Secure user management with sessions
- **Responsive Design**: Works seamlessly on all devices

## 🛠️ Technical Stack

### Frontend
- **Next.js 14** with App Router
- **React Server Components** for optimal performance
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Lucide Icons** for beautiful icons

### Backend
- **Prisma ORM** for database operations
- **PostgreSQL** for data persistence
- **Server Actions** for form handling
- **Session Management** for authentication

## 🏗️ Architecture

The system uses a polymorphic relationship design where comments can be attached to any entity:

```typescript
// Database Schema
model Comment {
  id        String        @id @default(cuid())
  entity    CommentEntity // ARTICLE, EPISODE, etc.
  entityId  String        // ID of the specific entity
  userId    String
  text      String
  parentId  String?       // For threaded replies
  // ... other fields
}
```

## 📦 Installation & Usage

1. **Clone the repository**
   ```bash
   git clone <your-repo>
   cd next-comment-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Add your DATABASE_URL and other required variables
   ```

4. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔧 Integration

Adding comments to any page is simple:

```tsx
import { Comments } from '@/features/comments/components/comments';

// In your page component
<Comments entity="ARTICLE" entityId={article.id} />
```

The system automatically handles:
- Loading comments for the specific entity
- User authentication
- Creating, editing, and deleting comments
- Threaded replies
- Real-time updates

## 🎯 Use Cases

This comment system is perfect for:
- **Blog platforms** - Article comments
- **Podcast apps** - Episode discussions
- **E-commerce sites** - Product reviews
- **Documentation sites** - Page feedback
- **Social platforms** - Post interactions

## 📄 License

MIT License - feel free to use this in your own projects.
