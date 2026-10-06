# Project name
 Scholarship Manager


 ## Purpose
The purpose of this website is to develop a scholarship management system where students can search their suitable universities and scholarship, also they can apply for the scholarship through this scholarship management system.


## Live URL
([Scholarship manager](https://scholarship-management-bd2ca.web.app/)).


## Key features
- On this website there are 3 types of users: one is by default user, another one is admin and another one is the moderator. That means when a user registers his/her role will be user. This role can be changed by the admin.
- Implemented tanstack query in all the data fetching functionality (for GET method only)
Currently, two official plugins are available:
- Navbar- User Dashboard and Admin Dashboard will show according to the logged-in user role.
- Top scholarship: Here top scholarship searching/selecting criteria depends on scholarship that means which scholarship has low application fees and is also recently posted.
Each scholarship shows data among which is rating (just rating point, it is the average rating point of all rating points).
- After clicking the Scholarship Details button it will take the user to the Scholarship Details page (this page is private).
Also showed all the reviews that users gave for this scholarship in review card designs. A slider/carousel is used to show the review.
- After clicking the Apply Scholarship button it will take users to the payment/checkout page. On this page users need to pay the application fees, after payment is successfully done user can apply for the scholarship in this system. Stripe is used as the payment gateway for this.
After successfully payment done on this page, a form is shown that the user can submit his/her information.
After clicking Submit/Apply more information is added and then this data is posted to database as an applied scholarship.
- The top of the All Scholarship page will have a search box and a Search button. Users can search by scholarship name, university name and degree name.
- Authentication
Email and password-based authentication is implemented.
- User Dashboard (Private Route)
When a user clicks on the Dashboard, he/she will be redirected to a page where there will be the following routes:
A. My Profile.
B. My Application.
C. My reviews.

- My Application page: Showed in tabular format. For each row, I have shown:
Application status,
 Three action buttons, the Details, Edit and Cancel button
 Add review button
 If the application status is pending user can edit the application otherwise user cannot edit the application.
- Add Review button: When a user clicks the add review button the user will be able to give a review on this particular scholarship.
- Moderator Dashboard:
(Private Route) and only the users who have the Moderator role will be able to see these routes.
When a user clicks on the Dashboard, he/she will be redirected to a page where there will be the following routes:
D. My Profile.
E. Manage Scholarships.
F. All reviews.
G. All applied scholarship.
H. Add Scholarship

- All applied scholarship: On this page, a moderator can see all the applied scholarship in tabular format, each application shows
Application status
Three action buttons, the Details, Feedback and Cancel button.
- Feedback button: After clicking the feedback button a modal is opened with a feedback input field that the moderator can give feedback for this application. After submitting the feedback this feedback is shown in the user (his/her) Application page.
- Cancel button: If the moderator wants he/she can cancel any application by clicking the cancel button. If the application is cancelled, the applicant will see the status rejected.
- Add Scholarship: On this page, a moderator can be able to add scholarship data:
University image/logo (using imgbb to host image)
After clicking the Add Scholarship button it will be inserted in database and shows an alert.
- Admin Dashboard
(Private Route and only the users who have the admin role will be able to see these routes):
A. Admin Profile.
B. Add Scholarship.
C. Manage Scholarship.
D. Manage Applied Application
E. Manage Users.
F. Manage Review
The pages from A-D, F will follow that respective page already mentioned in the moderator Dashboard.
- Manage Users: On this page, the admin will see all the users in tabular format. Each user information shows
User Name, User Email, User Role (user, moderator, admin), Delete button
Admin can change the user role by clicking the dropdown menu.
- Implemented sort functionality for the user role in the Admin dashboard.

- Made a pagination in All Scholarship route.
- I have implemented sort functionality in the top middle of the moderator/admin dashboard that can easily filter by applied date, and scholarship deadline.
- Implemented JWT on login (Email/password and social) and stored the token in local storage.
- Implemented an analytics chart page in the Admin dashboard.


## Npm packages used in my project
- [react-icons](https://react-icons.github.io/react-icons/)
- [React Hook Form](https://react-hook-form.com/)
- [React Router](https://reactrouter.com/home)
- [React Rating](https://www.npmjs.com/package/@smastrom/react-rating)
If you are eager for an application, I recommend using Stripe as the payment gateway. Check out the 
- [React Stripe.js](https://www.npmjs.com/package/@stripe/react-stripe-js) 
for information on how to use Stripe.
- [`tailwindcss`](https://tailwindcss.com/)
- [`Tanstack Query`](https://tanstack.com/query/latest)
- [`axios`](https://axios.rest/pages/getting-started/first-steps)
- [`Firebase`](https://firebase.google.com/)
- [`Moment`](https://momentjs.com/)
- [`react-helmet-async`](https://www.npmjs.com/package/react-helmet-async)
- [`react-responsive-carousel`](https://www.npmjs.com/package/react-responsive-carousel)
- [`react-toastify`](https://www.npmjs.com/package/react-toastify)
- [`Recharts`](https://recharts.github.io/)
- [`sweetalert2`](https://sweetalert2.github.io/)
- [`swiper`](https://www.npmjs.com/package/swiper)