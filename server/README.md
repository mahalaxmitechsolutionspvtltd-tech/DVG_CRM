how to run the laravel project

Step 1 ->  you Pc should  have aleady install the xammp with letest php 8.2.xxx version Tep 
Step 2 ->   Go into the project folder
Step 3 ->  Install PHP dependencies 
           'composer install' 

Step 3 ->    3. Create your .env file
               'copy .env.example .env'

Step 4 ->    4. Generate the application key
               'php artisan key:generate'    


 Step 4 ->    DB_DATABASE=your_db_name
              DB_USERNAME=your_db_user
              DB_PASSWORD=your_db_password


 Step 5 ->    Run migrations (if the project uses a DB)
               'php artisan key:generate'   