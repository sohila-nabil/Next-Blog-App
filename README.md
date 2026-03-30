# 📝 Blog App (Next.js App Router)

A full-stack blog platform built with **Next.js (App Router)** that allows users to explore blogs, filter by category, view details, and interact through comments. The application also includes a powerful **Admin Dashboard** for managing blogs and users.

---

## 🔎 Project Overview

This application provides a complete blogging experience where users can browse blogs, filter them by category, read detailed content, and leave comments.

An admin dashboard is available to manage blogs and users, including publishing, editing, and deleting content.

---

## 🚀 Features

### 🌐 Website (User)

* Browse all blogs
* Filter blogs by category
* View blog details page
* Add comments on blogs
* Responsive design for all devices

---

### 📊 Dashboard (Admin)

* Add new blog posts
* Edit existing blogs
* Delete blogs
* Change blog status (Publish / Unpublish)
* View all blogs in a list
* Manage users (view & delete users)

---

## 🧰 Tech Stack

* **Frontend & Backend:** Next.js (App Router)
* **Database:** MongoDB + Mongoose
* **Styling:** Tailwind CSS
* **Authentication:** ( Clerk )
* **State Management:** React Hooks


---

## 📦 Install Dependencies

```bash
npm install
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SIGNING_SECRET=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
MONGO_URL =
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_BACKEND_URL_PRODUCTION =https://next-blog-app-d6un.vercel.
NEXT_PUBLIC_BACKEND_URL=https://next-blog-app-d6un.vercel.app
NEXT_BACKEND_URL = http://localhost:3000
```

---

## ▶️ Run the Application

```bash
npm run dev
```

Then open:

```
http://localhost:3000
```

---

## 🔐 Admin Dashboard

Access the dashboard from:

```
/admin
```

Admin can:

* Manage blogs (create, update, delete)
* Control publish status
* Manage users

---

## ✨ Future Improvements

* Authentication system (login/register)
* Likes & reactions on blogs
* Rich text editor for blog content
* Image upload support (Cloudinary)
* Pagination & search optimization

---

## 📸 Screenshots (Optional)

<img width="1341" height="643" alt="Capture12" src="https://github.com/user-attachments/assets/30e7628d-36a0-4edc-a957-714caf6513ff" />
<img width="1347" height="637" alt="Capture11" src="https://github.com/user-attachments/assets/453a42af-35d4-4b5f-934f-81b2feeab730" />
<img width="1346" height="641" alt="Capture10" src="https://github.com/user-attachments/assets/ea6baf98-3307-4c35-a7ac-3ace76dc4de3" />
<img width="1343" height="642" alt="Capture9" src="https://github.com/user-attachments/assets/a7ee530c-d390-4f48-b4c1-696d5c5ee5d4" />
<img width="1332" height="642" alt="Capture8" src="https://github.com/user-attachments/assets/40b77be3-c922-44b7-9700-c997fd7a5bfc" />
<img width="1358" height="644" alt="Capture7" src="https://github.com/user-attachments/assets/b3c98acc-93ef-45fb-b32b-5107cc9ed845" />
<img width="1362" height="635" alt="Capture6" src="https://github.com/user-attachments/assets/623c8531-10e9-4957-a7cf-7ce296bfadc5" />
<img width="1355" height="645" alt="Capture5" src="https://github.com/user-attachments/assets/3a8ea13b-2f5a-4ecd-90ce-627f78aecd28" />
<img width="1350" height="642" alt="Capture4" src="https://github.com/user-attachments/assets/62c928e7-d7f6-47b2-bbcb-1376108a2c2a" />
<img width="1354" height="639" alt="Capture3" src="https://github.com/user-attachments/assets/e9bbb0c6-03b3-41d0-9f5a-37dffff65ae1" />
<img width="1324" height="513" alt="Capture2" src="https://github.com/user-attachments/assets/7341cfba-423e-4566-8118-8214b8ddb71e" />
<img width="1360" height="642" alt="Capture" src="https://github.com/user-attachments/assets/cfe9e33d-6a0a-4d8e-9050-3476cd2d5bb2" />


---

## 📄 License

This project is open-source and available under the MIT License.
