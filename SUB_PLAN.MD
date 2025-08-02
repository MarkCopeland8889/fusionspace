FUSIONSPACE BUILDING OUTLINE


OVERVIEW: You will use this document to decide on how to build the application. This document contains a full list of all the pages and features needed for the application. You have freedom to choose more intuitive ways to build these processes and you are not restricted from adding features to this list. 

WHAT IS FUSIONSPACE: FusionSpace is an AI-powered builder that helps you instantly create modern web apps, dashboards, landing pages, and business websites without writing boilerplate code or setting up infrastructure. Just describe what you want, and FusionSpace generates a working app using smart templates, real React/Next.js code, and live previews. FusionSpace is built for two main groups: Software developers and indie hackers who want to skip setup and build full-stack apps fast. It’s perfect for MVPs, admin panels, SaaS tools, or anything custom. You can export clean code, edit deeply, or deploy instantly. Small business owners, freelancers, and creators who need a website but don’t want to code. FusionSpace builds clean, responsive sites with booking forms, product pages, menus, or contact forms based on your description. Why use FusionSpace? The AI understands what you’re trying to build and starts you with a great foundation. Everything runs in React and Next.js, so it’s developer-friendly and production-ready. You get live previews inside the builder without needing to deploy first. Built-in user accounts let you save and manage projects easily. FusionSpace helps you go from idea to live app in minutes.

LIBRARIES/FRAMEWORKS NEEDED:
React
Next
Google GenerativeAI
Clerk
Supabase

1.1: LANDING PAGES OVERVIEW
The front of this website should have a responsive and interesting landing page. I will provide you with a template you should stick to, that has clerk signup/login routing. You will need to set up the routing for the future dashboard to the signup/login page so if a user is signed in they have access to the dashboard. The landing pages will have other pages such as about, contact, pricing, terms of service and privacy policy.


1.1.1: LANDING-HOME PAGE
The landing home page should feature a header that has the company logo, the company name, links to all the sitepages and the ability to login/signup (and if a user is signed up, those are replaced by a dashboard button that takes the user straight to the dashboard). Continuing with the rest of the landing homepage, there should be a hero section with a try out section where a user can type in a simple prompt, and when they click enter, it prompts them to signup/login. Keep the rest of the landing page site template the same. Talk about how you can now build a site or web app instantly, whatever your occupation is. Highlight heavily that we provide free sales and marketing training inside to provide you a clear roadmap to get your first customers.

1.1.2: ABOUT ME PAGE
The about me page should not be generic talking about the mission, vision, statements, etc about the company, instead it should show empathy and talk about how FusionSpace provides value to people who don’t have time to build a website or don’t have technical skills to build an app or SAAS. The about me page should also talk about the owner and his deep commitment to making development and site creation an easy accessibility. Lastly, it should mention a bit about the background and history of the CEO, Colton Scott, his education history (Clemson University) and more about him. If the template already has a good about me section, you can leave it as is and fill it in. 

1.1.3: CONTACT PAGE:
Should provide email (admin@fusionspace.net) and phone number (8643923861). There should be a send a message form with an embed of this Google form (https://forms.gle/Ex4XNDgwE3zYe8Zv5).

1.1.4: PRICING PAGE
Free plan: Up to 2 projects, 10 AI messages a day, up to 50 a month. Plus plan: $20, 30 messages a day, 150 messages a month, custom domain, hosting priveleges, access to advanced AI (coming soon) and unlimited projects. Pro Plan: $50 a month, unlimited messages up to 300 a month, plus everything in plus plan. For enterprise solutions, please contact us with a link to this Google form: ()

1.1.5: TECHNICAL PAGES:
Terms of Service and Privacy Policy. Will be created later

1.1.6: COMING SOON PAGE
Should be a page or tsx component that displays when you click on a link or a tab that is not ready yet. Should say “Coming Soon”, have some other text and have a button that sends you back to wherever you came from, be it dashboard, settings, etc. 

1.2: POST SIGNUP FUNCTIONALITY: Includes Dashboard, New project onboarding screen, Edit page, Simple mode, advanced mode, share page, hosting, settings page, sales and marketing courses page, analytics page, dete page,  and coming soon pages,

1.2.1: DASHBOARD
The dashboard should be clean and responsive, following the same theme of the website template and using the same components. The dashboard should also include a header with the FusionSpace logo, and a settings icon that opens the settings page. There should be a left sidebar with various menu links, current selected page is “Dashboard”, Next sidebar options are “Launch Your Business” with marketing and sales tutorials to get your product off the ground. “Analytics” should show analytics tab. “Community” should show community tab, but that tab is coming soon. Lastly, Settings should be listed again for ease of find. In the main dashboard screen, the title should be “‘Welcome back, {user.firstName}!’”, below that, there should be a blue box that says create new project with a plus symbol, when clicked, pops up the create project onboarding screen, and below it there should be a grid of projects. These are the projects the user has created. Each project should be a box that has the following: The project logo, the project name, the type of project (“Simple” should be green, and “Advanced” should be blue), the date last edited, and below a split column where on the left is a white or blue edit button, and to the right is a red delete button. When the edit button is clicked it opens the edit screen for that project. When you click delete, it shows a delete confirmation screen that makes you type in the name of the project and hit enter to confirm delete. 

1.2.2: NEW PROJECT ONBOARDING SCREEN
When a user clicks the blue “New Project”, an onboarding screen pops up that has a title “What would you like to create?” With an input box below that has an example prompt placeholder. The input box has a file upload icon when clicked, can attach a file or multiple files (up to 20 & total under 500MB) to use in the following project if created. Below that there is a header “Choose your project type” With two large boxes in a column split. The first box is green and has a recommended bare, below it the box has a small header that says “Website” with a computer icon below, and below the computer icon, text that says “Choose this option if you want to build a website for your business.” The second box says “Online Application” with a rocket symbol below it. Below it there is text that says “Choose this option if you want to build a full stack application that has API integrations.” Which one you choose determines whether the project creates into simple or advanced mode. Below the two boxes are a large create app button that when clicked, saves the prompt as a variable, and also saves the files, template selection and project type and creates a project.

1.2.3 EDIT SCREEN
A project will be created if a user enters a prompt, clicks a project category, and hits enter. When the project is created, it will use the “ Project Name & Logo Create” Prompt chain and will open in the project edit screen. The project screen goes as follows: 
Header:
FusionSpace Logo with arrow dropdown symbol ↓. When clicked on, FusionSpace status dropdown menu
FusionSpace status dropdown menu: Starts off with text “↙️ Back to Editor” that closes the menu. Below it is the user’s name, and below that is the user’s email. Below that is a box that says credits and has two “progress bars” which are “Monthly Credits” and “Daily Credits”, which track the amount of credits you have left based on your plan, be it free, plus, pro, enterprise. If you have the free plan, its 10 credits a day, 50 a month. Whenever you ask the AI to do something for you, you use a credit, and whenever your credits are all used, you cannot use AI anymore until they are refiled, daily or monthly. Below the Credits section, there are the following links: “📖 Documentation”, “💳 Billing”, “ℹ️ Help Center”, “🚀 Upgrade Plan”, and “⬅️ Sign Out”.
Project logo created from the “Project Name & Logo Create” Prompt command chain. Logo has a small pencil icon in the corner, when clicked on, shows an upload & edit screen.
Logo change upload & edit screen: Shows two headers, first one is “Option 1: Upload Your Own Logo File” and below it there is a drag and drop upload box/button. When a user uploads a jpeg, webp, png, svg, or other compatible image format to that box, it replaces the old logo. Below that is header two, “Option 2: Ask AI to generate a logo for you” that sends a prompt to Google GenerativeAI imagen-4 “Generate a minimalistic logo with this prompt: {user.logoChange.prompt}”
Project name created from the “Project Name & Logo Create” Prompt command chain.
Next to the project name there is an edit button that is outlined and transparent, when clicked on, allows you to edit the AI generated project name or write your own name. It also spawns blue text below “Ask AI to generate project name” that when clicked on, sends a simple prompt to Google GenerativeAI gemini.1.5-flash “ RETURN ONLY with the COMPANY NAME, NO OTHER TEXT. Generate me a simple name for this business/website/app {user.projectPrompt}” When the LLM returns the name, the new name replaces the old one.  If you have a better prompt in mind, please use it instead.
Spacer
Save button: When the save button is clicked, it saves all the variables in the project. All the variables in the project autosave normally every checkpoint, but to give people peace of mind we leave a save button. If possible, varies from browser to browser, when a user hits ctrl+s on win/lin or cmd+s on osx, the save button is triggered, but usually the ctrl+s/cmd+s saves the browser window as a html page, so we need to disable that with our FusionSpace code first.
Share button: Opens the share screen when clicked
Share screen: Header “Share this project!”. Below this is “View Link”. The text box with the view link page is greyed out if the project is not deployed, and a section appears under it that says “You have not deployed this project yet! Click here to deploy it” with a button that says “Deploy 🚀”. If it is deployed, a text box with a view link to your project appears, and next to that text box is a copy button with a copy symbol. Below that is “Project Remix Link”, with paragraph text “Automatically private unless shared” With a text box under it containing the remix link for the project, and next to that text box is a copy button with a copy symbol.
Deploy button: When clicked: Pops up deploy and custom domains screen
Deploy and custom domains screen: Header “Deploy your project!” 
With a link to your project’s new link, or if it is not loaded yet, there is a loading symbol that updates every 2 seconds. Once the project is deployed, a text box appears with a view link to your newly deployed project, and next to the text box is a copy button that copies your project’s view link when clicked. 
Below that is a header “Configure a custom domain” with a button that says “Configure domain” and when clicked opens the configure domain screen
Configure domains screen: Upon clicking the “Configure domain” button, the user is presented with the Configure Domain Screen. This screen is headed by the title “Configure Your Custom Domain ✨” and includes a brief instructional paragraph explaining that the user must log in to their domain provider (e.g., GoDaddy, Namecheap) to update their DNS records. Below this is an input field prompting them to "Enter your domain (e.g., mycoolproject.com)". After a domain is entered, instructions appear guiding the user to add two records to their domain's DNS settings, noting that it can take up to 48 hours for the changes to become active. They are instructed in a table/grid to add an A Record with the Name/Host set to @ and the Value to 76.76.21.21, as well as a CNAME Record with the Name/Host set to www and the Value/Target set to cname.fusionspace.net. Below this, a "Verification Status" section initially shows a "Pending Verification" status next to a "Verify Domain" button. When clicked, the system checks the records, displaying "Verifying..." before updating to either "Connected ✅" upon success or "Error - Records not found ❌" if it fails. The screen features a final "Done" button to close the window and a link to a help guide for further assistance. Once the window is closed, it takes you back to the Deploy and custom domains screen, but now there is a button under the visible deploy button or view link that says “Use {domain.name}”. Once clicked, the server will use the domain that the user gave and that replace the old view link with the link to their domain. Keep in mind if the user clicks on the deploy button again and adds another domain, more domain buttons, i.e, “Use domain 2”, “Use domain 3” will pop up and be available for use.
Download button: Sits next to the deploy button, which sits next to the share button. When clicked, the whole project and all its files download as a zip. 
Settings icon: When clicked on, shows the project settings page.
Project settings page: Has title “Settings”. Here are the following fields to be edited:
“Main Page” Subtitle “Set the default landing page for your app” Dropdown: Your app pages, when a page is selected, it sets as the new homepage.
“App Visibility” Subtitle “Control who can access your application” Dropdown Options: Public, Private. When private is selected, it can only be viewed if you are logged in, otherwise, it redirects to the FusionSpace Sign Up/Sign In Page with Clerk
FusionSpace Badge: Show or hide the “Edit with FusionSpace” badge on your website. By default the Edit with FusionSpace badge is visible on any site of anyone who is not subscribed to a paid plan of FusionSpace. When a person subscribes to a paid plan of FusionSpace, all “Edit with FusionSpace” badges on all their projects are turned off by default. If the user accessing the settings page is not subscribed to a paid tier of FusionSpace, they do not have the option to turn off the FusionSpace badge.
Duplicate App: When clicked, makes a copy of the app
Backend Functions: Subtitle “Enable server-side functionality (Alpha)” Only available to plus users. More details on this later.
Red “Delete App” Button that shows delete confirmation screen shown earlier.
Now that we’ve covered all the things related to the header, we will talk about the editor interface, which is below the header. It is a 3-column split, the first column is the AI chat interface. This is an interface similar to a text message interface or similar to the OpenAI chat interface. When you type a prompt, the prompt you type in is blue, and the prompt is sent to the AI. Depending on what project type you have, what type of message it is, and what number message you are on, certain prompt chains will be triggered, and the responses will be recorded as received “text messages” or received chats in grey or transparent outlined boxes with white text. There are checkpoints that appear under finished chats as a line break with the text “🚩 Checkpoint” and a button that says “Revert to here”. Every time the AI makes edits or every time a certain prompt chain is triggered, the whole project saves as a separate instance. In supabase/firebase this could look something like “(projectName)(date)(message #)”. This lets us be able to revert back to certain edits if something goes wrong. The second column is the file viewer, which shows us a file tree of all the files in this project. This tab can be closed, because at the top right it has a hide button that minimizes it. The third column is a preview screen, but it has three tabs at the top, one being “👁️ preview”, the second being “🛠️ edit code”, and the third being “(command line symbol) terminal”. Naturally, whenever a change is made, the preview screen updates. On the preview screen, there is a button in the corner that says “select and edit”. When clicked, you can click something and it will turn blue, you can select multiple items, and a chat box appears where you can type an edit prompt for AI to edit the page. When the edit code tab is opened, the file selected in the second column’s code appears and can be edited. If you are editing code, it saves as a separate instance autosaved every 2 minutes. When the user clicks on the terminal, a copy of all the terminal messages can be seen.

1.2.3.1 SIMPLE MODE VS ADVANCED MODE
There will be two types of projects: Static(Simple) and Full Stack(Advanced). Both projects are previewable, and use the same edit screen, the difference is that the project type determines which AI prompt chains or commands will be used for the project. 

1.2.4 Launch Your Business Page
The launch Your Business page is accessible from the left sidebar on the dashboard

1.2.5 Integrations
Set this to coming soon.

1.2.6 Analytics
This page can be accessed from the left hand sidebar on the dashboard. This page will stay within the dashboard menu. It will feature at the top, beside the header “Analytics” a dropdown menu with the first option being all and the other options being projects you have created. If all is selected, it shows analytics for all, if a project is selected it only shows analytics for that project. The analytics page first shows a graph titled views, that shows views of following selected. Below it there is a “users” graph that shows the number of users, and shows their email and country, and a “View data” button, all in a spreadsheet. When a user clicks “View data”, it pulls all the data from supabase or the database in a json format for the viewer to view. Once the viewer is done viewing, they can “X” out of it.

1.2.7 Community 
This page is coming soon

1.2.8 Affiliates
This page is coming soon

1.2.8 Overall Account Settings
This page is just “Settings” and can be accessed from the left hand sidebar on the dashboard. Here are the components of settings:
Account Information
Plan: ()tier, Upgrade plan button that takes you to pricing component.
Username
Email
Phone Number
Optional: Enter phone number to receive SMS notifications.
By entering your phone number, you agree to receive SMS notifications from us.
You can opt out at any time - just remove the number.
Full Name
Close account - asks for confirmation


Once we have designed everything here, we can move on to the logic, storage, and prompt chains/commands.


