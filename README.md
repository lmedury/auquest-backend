## Inspiration

We, the project developers, are international students coming all the way from India! Our transition to Auburn was quite difficult due to several reasons including temporary accommodation, lack of transportation, unavailability of minimum necessities that could otherwise be solved by a trusted marketplace, and a friend to rely upon.

So we decided to do a thing! During Auburn Hacks 2024, we wanted to develop a solution that simplifies the transition of new students coming from a different place, or even a different country. 

## What it does

Auburn Quest is a web-based application that hosts the following:
- A trusted marketplace (through auburn.edu email verification)
- A Ride-based marketplace (to pair drivers and riders going to a similar destination)
- A sublease repository (enabling current tenants to sublease their units, and prospective tenants to accept subleases)
- Chat-based application that can answer any questions related to Auburn University

## How we built it

Our tech stack consists of the following:
- MongoDB Atlas for a central repository of information about marketplace items, rides, and subleases
- Express.JS for backend server-based communication to integrate the User Interface and Database
- React.JS for User Interface, and React-Bootstrap for UI component library
- Auth0 for authenticating users to access the marketplace
- Cloudflare workers API for prompt-response based communication with Large Language Models to answer questions related to Auburn University 

## Challenges we ran into

Identifying the most important features to be built during the hackathon was a challenge as we had to identify the most pressing challenges. 
Technology wise, integrating MongoDB, creating collections, and accessing them was slightly difficult as there was some confusion on how to create collections and access them programmatically.

## Accomplishments that we're proud of

We are extremely proud of building the following features and being able to do a full system-integration and testing:

- An item-based trusted marketplace which accepts image inputs that displays the state of item
- A Ride-based marketplace to enables riders to find subsidized rides for fairly distant destinations (Atlanta airport)
- A sublease repository, also accepting images that displays the state of unit to current tenants sublease their units, and prospective tenants to accept subleases
- Chat-based application that can answer any questions related to Auburn University using Cloudflare Workers APIs

## What we learned

This is the first time we were able to use MongoDB effectively for all common Create, Read, Update, Delete operations.
We have also spent considerable time integrating auth0 into our application for enhanced security and offset the authentication process.
Further, it was a great experience learning about and integrating cloudflare's AI application to enable prompt-response based communication to answer questions related to Auburn University.

## What's next for Auburn Quest

We intend to demo this application to the Auburn University Graduate School and get their feedback, address it, and work with them to integrate the application into their website.
We also plan on talking to local businesses to advertise their business on our website to get them more customers with customized referral links for exclusive discounts.