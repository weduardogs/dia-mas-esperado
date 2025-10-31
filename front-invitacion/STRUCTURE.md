# Project Structure

## Overview
This application is organized with a modular component-based architecture where each invitation type is a self-contained component with its own folder structure.

## Directory Structure

```
src/
├── invitations/                    # Main invitations folder
│   ├── cye-wedding/               # CYE Wedding Invitation
│   │   ├── CyeInvitation.tsx      # Main invitation component
│   │   ├── components/            # Wedding-specific components
│   │   │   ├── Login.tsx
│   │   │   ├── WeddingInvitation.tsx
│   │   │   ├── CoverPage.tsx
│   │   │   ├── CoupleAnimation.tsx
│   │   │   ├── LocationSection.tsx
│   │   │   ├── ItinerarySection.tsx
│   │   │   ├── GuestListSection.tsx
│   │   │   └── ScrollIndicator.tsx
│   │   ├── hooks/                 # Wedding-specific hooks
│   │   │   └── useScrollNavigation.ts
│   │   └── utils/                 # Wedding-specific utilities
│   │       └── weddingData.ts
│   │
│   └── misxv-party/               # XV Años Party Invitation
│       ├── MisXvInvitation.tsx    # Main invitation component
│       ├── components/            # Party-specific components (ready for expansion)
│       ├── hooks/                 # Party-specific hooks (ready for expansion)
│       ├── types/                 # Party-specific types
│       │   └── index.ts
│       └── utils/                 # Party-specific utilities
│           └── partyData.ts
│
├── components/                     # Shared components
│   └── Welcome.tsx                # Main welcome/navigation component
│
├── pages/                         # Route pages
│   ├── CyePage.tsx               # CYE wedding route page
│   └── MisXvPage.tsx             # XV años route page
│
├── types/                         # Global shared types
│   └── index.ts
│
├── styles/                        # Global styles
│   └── index.css
│
├── App.tsx                        # Main app with routing
└── main.tsx                       # Application entry point
```

## Routes

- `/` → Redirects to `/welcome`
- `/welcome` → Main navigation page (Welcome component)
- `/cye` → CYE Wedding invitation (CyePage → CyeInvitation)
- `/misxv` → XV Años invitation (MisXvPage → MisXvInvitation)

## Architecture Benefits

### 🎯 **Modular Design**
- Each invitation is completely self-contained
- Independent state management per invitation
- Separate localStorage keys to avoid conflicts

### 🔧 **Scalable Structure**
- Easy to add new invitation types
- Components are reusable within each invitation
- Clear separation of concerns

### 📱 **Deployment Ready**
- Production build works correctly
- Client-side routing properly configured
- Static file handling for various hosting platforms

## Adding New Invitations

To add a new invitation type:

1. Create new folder: `src/invitations/new-invitation-type/`
2. Add main component: `NewInvitation.tsx`
3. Create subfolders: `components/`, `hooks/`, `utils/`, `types/`
4. Add route in `App.tsx`
5. Create page component in `src/pages/`
6. Update Welcome component with new navigation option

## Domain Access

When deployed:
- `mydomain.com/welcome` → Main selection
- `mydomain.com/cye` → Wedding invitation  
- `mydomain.com/misxv` → XV años invitation