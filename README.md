# Inventory Management

An inventory app I built with Next.js 14 and Material UI, mostly in August 2024. Items can be typed in by hand, or you can upload a photo and let Gemini name the item and pick its category.

![Inventory dashboard](./public/inventory1.png)

## Adding an item from a photo

The upload button posts the image to `app/api/sendphoto/route.js`. That route sends it to `gemini-1.5-pro-latest` along with the 104 category names in `utils/categories.js` and asks for a two-line answer, `Item:` and `Category:`.

`addItem` in `utils/itemController.js` then looks for an item with the same name in the Firestore `inventory` collection. If one exists its quantity goes up by one; if not, a new item is created with a quantity of 1.

The route reads the model's answer by line position, so it only works when Gemini replies in exactly that format. When a photo fails, the error goes to the browser console and the page shows no message.

![Add an inventory item](./public/inventory2.png)

## Manual entry

The add and edit dialog writes straight to the same `inventory` collection. The plus and minus buttons change a quantity by one, and minus stops at zero (`components/useInventory.js`).

## Local setup

```bash
git clone https://github.com/gelftheshot/inventory-management-app.git
cd inventory-management-app
npm ci
```

The code reads these two names from `.env.local`:

```dotenv
FIREBASE_API_KEY=your_firebase_web_api_key
GEMINI_API_KEY=your_google_api_key
```

`app/firebase.js` takes the Firebase key from `FIREBASE_API_KEY`, which has no `NEXT_PUBLIC_` prefix, while the inventory list talks to Firestore from the browser. Check that the key actually reaches the browser in your setup. The other Firebase values in that file belong to my project, so replace them with your own.

Run `npm run dev` and visit http://localhost:3000. A production build is `npm run build`, then `npm start`.

To use a different Gemini model for photos, edit the model name in `app/api/sendphoto/route.js`.

Full write-up: [Inventory Management project page](https://www.lihongebre.com/projects/inventory-management)
