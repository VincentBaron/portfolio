# Translation Structure Guide

## Overview

All translations are centralized in `/src/lib/translations.ts` using a clean, DRY (Don't Repeat Yourself) structure that eliminates duplication.

## Structure

The translation file is organized into two main sections:

### 1. **Multilingual Content** (Language keys within each item)

Used for arrays of content where each item has translatable fields:

```typescript
export interface Testimonial {
  quote: Record<Language, string>;      // { en: '...', fr: '...' }
  author: string;                        // Same in all languages
  role: Record<Language, string>;       // { en: '...', fr: '...' }
  image: string;                         // Same in all languages
  alt: Record<Language, string>;        // { en: '...', fr: '...' }
}

export const testimonials: Testimonial[] = [
  {
    quote: { en: 'English quote', fr: 'Citation française' },
    author: 'John Doe',
    role: { en: 'CEO', fr: 'PDG' },
    image: '/john.jpg',
    alt: { en: 'John Doe, CEO', fr: 'John Doe, PDG' }
  }
];
```

**Usage in components:**
```tsx
import { testimonials } from '../lib/translations';
import { useLanguage } from '../lib/language';

function Component() {
  const { language } = useLanguage();
  
  return (
    <div>
      {testimonials.map(t => (
        <blockquote key={t.author}>
          {t.quote[language]}        {/* Access with [language] */}
          <cite>{t.role[language]}</cite>
        </blockquote>
      ))}
    </div>
  );
}
```

### 2. **Static Translations** (Simple key-value per language)

Used for UI strings, labels, and other non-array content:

```typescript
export interface Translations {
  header: {
    nav: {
      home: string;
      packages: string;
    };
    bookCall: string;
  };
  // ... more sections
}

export const translations: Record<Language, Translations> = {
  en: {
    header: {
      nav: { home: 'Home', packages: 'Packages' },
      bookCall: 'Book a Call'
    }
  },
  fr: {
    header: {
      nav: { home: 'Accueil', packages: 'Forfaits' },
      bookCall: 'Réserver un appel'
    }
  }
};
```

**Usage in components:**
```tsx
import { getTranslations } from '../lib/translations';
import { useLanguage } from '../lib/language';

function Component() {
  const { language } = useLanguage();
  const t = getTranslations(language);
  
  return (
    <nav>
      <a href="/">{t.header.nav.home}</a>
      <a href="/packages">{t.header.nav.packages}</a>
    </nav>
  );
}
```

## Benefits of This Structure

### ✅ **DRY Principle**
- No duplication of data structures
- Single source of truth for each content item
- Easy to maintain and update

### ✅ **Type Safety**
- Full TypeScript support
- Autocomplete for all translation keys
- Compile-time error checking

### ✅ **Scalability**
- Easy to add new languages: just add to `Language` type and update objects
- New content follows clear patterns
- Consistent across the entire codebase

### ✅ **Clear Separation**
- Arrays with multilingual fields → `Record<Language, string>` pattern
- Simple UI strings → `translations[language]` pattern
- Easy to understand which pattern to use

## Adding New Content

### For Array Items (Testimonials, Packages, etc.)

1. Define interface with `Record<Language, string>` for translatable fields
2. Create the array with language keys nested within items
3. Export the array
4. Import and use with `[language]` accessor

```typescript
// In translations.ts
export interface Feature {
  title: Record<Language, string>;
  description: Record<Language, string>;
  icon: string; // Same in all languages
}

export const features: Feature[] = [
  {
    title: { en: 'Fast', fr: 'Rapide' },
    description: { en: 'Lightning fast', fr: 'Ultra rapide' },
    icon: '⚡'
  }
];

// In component
import { features } from '../lib/translations';
<h3>{feature.title[language]}</h3>
```

### For Simple UI Strings

1. Add to the `Translations` interface
2. Add translations to both `en` and `fr` objects
3. Use via `getTranslations(language)`

```typescript
// In translations.ts - add to interface
export interface Translations {
  // ... existing
  newSection: {
    title: string;
    subtitle: string;
  };
}

// In translations.ts - add to both languages
en: {
  // ... existing
  newSection: {
    title: 'New Section',
    subtitle: 'Description'
  }
}

fr: {
  // ... existing
  newSection: {
    title: 'Nouvelle Section',
    subtitle: 'Description'
  }
}

// In component
const t = getTranslations(language);
<h2>{t.newSection.title}</h2>
```

## Adding a New Language

To add a new language (e.g., Spanish):

1. **Update Language type:**
```typescript
export type Language = 'en' | 'fr' | 'es';
```

2. **Update all multilingual content:**
```typescript
export const testimonials: Testimonial[] = [
  {
    quote: { 
      en: 'English', 
      fr: 'Français',
      es: 'Español'  // Add Spanish
    },
    // ... other fields
  }
];
```

3. **Add to static translations:**
```typescript
export const translations: Record<Language, Translations> = {
  en: { /* ... */ },
  fr: { /* ... */ },
  es: { /* ... */ }  // Add complete Spanish translation
};
```

4. **Update language switcher in Header component**

## Migration Complete ✅

All components now use this centralized translation system:
- ✅ `Hero.tsx` - Uses `getTranslations()` and `testimonials` array
- ✅ `Header.tsx` - Uses `getTranslations()`
- ✅ `Footer.tsx` - Uses `getTranslations()`
- ✅ `Packages.tsx` - Uses `packageItems` array with nested language keys
- ✅ `CaseStudiesGrid.tsx` - Uses `getTranslations()`

No more scattered translations or duplicated structures!
