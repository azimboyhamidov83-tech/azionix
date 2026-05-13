# LOVEGRAM Find Page - Implementation Guide

## Quick Start

### Option 1: Using React Component (Recommended)

If you're using the app layout with the sidebar, you can import and use the FindPage component:

```tsx
// app/find/page.tsx
import FindPage from '@/components/FindPage';

export default function FindPage() {
  return <FindPage />;
}
```

The component uses:
- ✅ Lucide React icons
- ✅ Tailwind CSS for styling
- ✅ Responsive design
- ✅ Your existing user data structure

### Option 2: Updated Next.js Page

We've already updated `app/find/page.tsx` to use the new design. It integrates with:
- Your existing users data
- Search/filter functionality
- Link navigation to user profiles

Just ensure Tailwind CSS is configured in your project.

### Option 3: Standalone HTML

Use `FindPage.html` as a reference or standalone version:
- Pure HTML + CSS
- No dependencies
- Can be customized easily
- Good for prototyping or static pages

---

## Installation Requirements

### Dependencies

```bash
npm install lucide-react
```

### Tailwind CSS Setup

Ensure your `tailwind.config.ts` includes:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ec4899",
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## Customization

### Colors

To change the pink color globally, update `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      pink: {
        500: "#ec4899",  // Primary pink
        600: "#be185d",  // Darker pink
      },
    },
  },
}
```

Or use Tailwind's built-in pink palette and adjust as needed.

### Sidebar Width

Default: `14rem` (224px)

To change, update the className in FindPage.tsx or your layout:

```tsx
<div className="w-48 md:w-56">  {/* Change these values */}
```

### Search Placeholder Text

Update in the component:

```tsx
placeholder="Your custom text..."
```

### Avatar Images

Replace the `avatar` property in the users data:

```typescript
// data/users.ts
export const users = [
  { 
    username: "guli",
    avatar: "your-image-url.jpg"  // Add this
  },
];
```

---

## Component Props (FindPage.tsx)

Currently, the React component doesn't require props, but you can modify it to accept:

```typescript
interface FindPageProps {
  onUserClick?: (username: string) => void;
  showSidebar?: boolean;
  customUsers?: User[];
  colors?: {
    primary?: string;
    secondary?: string;
  };
}
```

---

## Styling Variants

### Dark Mode
Already implemented as the default. To support light mode:

```tsx
<div className="dark:bg-black bg-white">
  {/* Content */}
</div>
```

### Compact View

For mobile or compact displays:

```tsx
<div className="w-full md:w-48">  {/* Adjust breakpoint */}
```

### Alternative Layouts

**Grid View Instead of List:**

```tsx
<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
  {users.map(user => (
    <div key={user.id} className="flex flex-col items-center">
      {/* Card layout */}
    </div>
  ))}
</div>
```

---

## Performance Optimization

### Image Optimization

Use Next.js Image component:

```tsx
import Image from 'next/image';

<Image
  src={user.avatar}
  alt={user.username}
  width={56}
  height={56}
  className="rounded-full"
/>
```

### Virtualization for Large Lists

For 1000+ users, use `react-window` or `react-virtual`:

```tsx
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={users.length}
  itemSize={64}
>
  {({ index, style }) => (
    <div style={style}>
      {/* Render user item */}
    </div>
  )}
</FixedSizeList>
```

---

## State Management

### Adding Favorites/Bookmarks

```tsx
const [favorites, setFavorites] = useState<string[]>([]);

const toggleFavorite = (username: string) => {
  setFavorites(prev => 
    prev.includes(username)
      ? prev.filter(u => u !== username)
      : [...prev, username]
  );
};
```

### Adding Follow/Unfollow

```tsx
const [following, setFollowing] = useState<Set<string>>(new Set());

const toggleFollow = (username: string) => {
  setFollowing(prev => {
    const newSet = new Set(prev);
    newSet.has(username) ? newSet.delete(username) : newSet.add(username);
    return newSet;
  });
};
```

---

## API Integration

### Fetching Users Dynamically

```tsx
const [users, setUsers] = useState<User[]>([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
  setLoading(true);
  fetch('/api/users')
    .then(res => res.json())
    .then(data => setUsers(data))
    .finally(() => setLoading(false));
}, []);
```

### Search with API Call

```tsx
const [results, setResults] = useState<User[]>([]);

const handleSearch = async (query: string) => {
  const response = await fetch(`/api/users/search?q=${query}`);
  const data = await response.json();
  setResults(data);
};
```

---

## Browser DevTools Tips

### Inspecting Elements

1. Right-click any element → "Inspect"
2. Check the Computed styles to see all active CSS
3. Toggle classes in the Element panel to test hover states

### Debugging Layout

- Use `outline: 1px solid red` to see element boundaries
- Check `box-sizing` if spacing seems off
- Verify `overflow` properties for scrollable sections

### Performance

- Check rendering performance in DevTools
- Monitor memory usage for large lists
- Use React Profiler for component performance

---

## Common Issues & Solutions

### Issue: Search bar overlaps content

**Solution:** Increase padding-bottom of user list:

```tsx
<div className="pb-32">  {/* or pb-36, pb-40 */}
```

### Issue: Sidebar not hiding on mobile

**Solution:** Ensure media queries are working:

```tsx
<div className="w-48 md:w-0">  {/* Hide on mobile */}
```

Or use a hamburger menu:

```tsx
const [showSidebar, setShowSidebar] = useState(false);
{showSidebar && <Sidebar />}
```

### Issue: Avatar images not loading

**Solution:** Check image URLs and CORS policies:

```tsx
<img 
  src={user.avatar} 
  alt={user.username}
  onError={(e) => {
    e.target.src = "/placeholder.jpg";
  }}
/>
```

### Issue: Glowing effects not visible

**Solution:** Ensure `backdrop-filter` is supported:

```tsx
className="backdrop-blur-sm"  /* requires PostCSS in Tailwind */
```

---

## Testing

### Unit Tests

```typescript
import { render, screen } from '@testing-library/react';
import FindPage from './FindPage';

test('renders user list', () => {
  render(<FindPage />);
  expect(screen.getByText('@guli')).toBeInTheDocument();
});

test('filters users by search', () => {
  render(<FindPage />);
  const input = screen.getByPlaceholderText('Qidirish uchun...');
  fireEvent.change(input, { target: { value: 'guli' } });
  expect(screen.getByText('@guli')).toBeInTheDocument();
});
```

### E2E Tests (Playwright)

```typescript
test('navigate to user profile', async ({ page }) => {
  await page.goto('/find');
  await page.click('text=@guli');
  await page.waitForURL(/\/profile\/guli/);
});
```

---

## Deployment

### Vercel

```bash
npm run build
npm run start
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "start"]
```

---

## Support Files

- `components/FindPage.tsx` - Main React component
- `app/find/page.tsx` - Next.js page with data integration
- `FindPage.html` - Standalone HTML version
- `styles/design-system.css` - CSS variables and utilities
- `DESIGN_DOCUMENTATION.md` - Design system details

---

## Next Steps

1. ✅ Copy the component or page
2. ✅ Install dependencies (`lucide-react`)
3. ✅ Ensure Tailwind CSS is configured
4. ✅ Test on desktop and mobile
5. ✅ Customize colors/styling as needed
6. ✅ Integrate with your API/data
7. ✅ Add animations/interactions
8. ✅ Deploy!

---

## Questions?

Refer to:
- Tailwind CSS docs: https://tailwindcss.com
- Lucide Icons: https://lucide.dev
- React docs: https://react.dev
- Next.js docs: https://nextjs.org
