This web application is a QR Code generator that allows users to create QR Codes and save them online for marketing campaign management. The backend API & database are powered by Ruby on Rails and the frontend is powered by React.

This web application is a work-in-progress. Current features include:

- Backend database and API for Users and QR Codes.
- Frontend user interface allowing the user to interact with the database via API.
- Full CRUD capability: users can view, create, edit, and delete their QR Codes through the web application.
- User authentication & account creation. Users must be logged in to use the application and can only access QR Codes associated with their account.
- QR Codes can be downloaded in SVG format.

Features in-progress:

- Grouping QR Codes using projects for campaign management.
- Allowing users to collaborate by share access to projects through a many-to-many relationship.
- PNG export of QR Codes.
- Editing account details and deleting accounts.
- Metrics and anlaytics, using short URLs and redirects to track how many people use the QR code in realtime.
