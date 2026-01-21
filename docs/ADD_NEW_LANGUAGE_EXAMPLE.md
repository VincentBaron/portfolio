# Example: Adding Spanish Translation

This is a step-by-step guide on how to add Spanish language support to your portfolio.

## Step 1: Update the Language Type

In `/src/lib/translations.ts`, update the `Language` type at the top:

```typescript
export type Language = 'en' | 'fr' | 'es';  // Added 'es' for Spanish
```

## Step 2: Add Spanish Translations

In the same file, add Spanish translations to the `translations` object:

```typescript
export const translations: Record<Language, Translations> = {
  en: {
    // ... existing English translations
  },
  fr: {
    // ... existing French translations
  },
  es: {  // Add this entire section
    header: {
      nav: {
        home: 'Inicio',
        packages: 'Paquetes',
        work: 'Trabajo',
      },
      bookCall: 'Reservar una Llamada',
      logoAria: '2 Weeks to Solve It - Inicio',
      mobileOpen: 'Abrir menú',
      mobileClose: 'Cerrar menú',
      toggleMenuAria: 'Alternar menú de navegación',
    },
    hero: {
      headline: {
        primary: 'Aumenta tu Margen Neto\nPor Reclutador',
        highlight: 'Audito tus operaciones de reclutamiento e implemento sistemas impulsados por IA en 14 días para aumentar los márgenes sin contratar más personal.',
      },
      // ... continue with all sections
    },
    // ... continue with all sections
  },
};
```

## Step 3: Update the Header Component

In `/src/components/Header.tsx`, update the `languageOptions` array to include Spanish:

```typescript
const languageOptions: Array<{ code: Language; label: string; flag: string; sr: string }> = [
  { code: 'en', label: 'EN', flag: '🇬🇧', sr: 'English / Anglais / Inglés' },
  { code: 'fr', label: 'FR', flag: '🇫🇷', sr: 'French / Français / Francés' },
  { code: 'es', label: 'ES', flag: '🇪🇸', sr: 'Spanish / Espagnol / Español' },  // Add this line
];
```

## Step 4: Test the Translation

1. Save all files
2. Run your development server
3. Click the language selector in the header
4. Select "ES" 🇪🇸
5. Verify that all text appears in Spanish

## Tips for Translation

- **Maintain consistency**: Use the same terms throughout (e.g., always translate "Book a Call" the same way)
- **Check length**: Some languages are longer than others - make sure UI doesn't break
- **Test all pages**: Navigate through all pages to ensure everything is translated
- **Use native speakers**: If possible, have a native speaker review the translations
- **Keep special characters**: Maintain formatting like `\n` for line breaks in strings

## Translation Checklist

- [ ] Update `Language` type in `/src/lib/translations.ts`
- [ ] Add complete translation object for new language
- [ ] Update language selector in `Header.tsx`
- [ ] Test all pages
- [ ] Check responsive design with new language
- [ ] Verify special characters display correctly
- [ ] Test language switching functionality
- [ ] Update testimonials with translated `alt` text
- [ ] Check that buttons and CTAs fit properly
- [ ] Review with native speaker (if possible)

## Common Pitfalls to Avoid

1. **Forgetting alt text**: Update `testimonials` array with new language in `alt` property
2. **Missing interpolation**: Ensure placeholders like `{{email}}` or `{{percent}}` are kept in translations
3. **Breaking bullet points**: Keep `\n` characters in multi-line strings
4. **Inconsistent terms**: Use the same translation for repeated words
5. **UI overflow**: Some Spanish words are longer - check button widths

## Result

Once completed, users will be able to switch between English, French, and Spanish seamlessly, with all content properly translated!
