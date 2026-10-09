import { HostingStep, ProductionChecklistItem } from '../types';

export const CPANEL_STEPS: HostingStep[] = [
  {
    id: 'cpanel-1',
    type: 'cpanel',
    stepNumber: 1,
    title: 'Project Zip & Preparation',
    banglaTitle: '১. প্রজেক্ট ফাইল জিপ (Zip) করা ও অপ্রয়োজনীয় ফাইল বাদ দেওয়া',
    englishDescription: 'When compressing your Laravel project, exclude the `node_modules` folder and local `.git` directory to keep file size small. You can include `vendor` if small, or run composer install via cPanel terminal. Ensure your `.env` file is prepared with production database settings.',
    description: 'লোকাল কম্পিউটার থেকে প্রজেক্ট জিপ করার সময় `node_modules` ফোল্ডার অবশ্যই বাদ দিন। যদি লোকাল ভেন্ডর ফাইল ছোট হয় তবে রাখতে পারেন, অথবা সার্ভারে টার্মিনালে কম্পোজার দিয়ে ইন্সটল করতে পারেন। নিশ্চিত করুন `.env` ফাইলটি সাথে আছে বা সার্ভারের জন্য রেডি আছে।',
    englishNote: 'Never zip node_modules. It drastically inflates upload time and disk usage.',
    importantNote: 'কখনোই node_modules জিপ করবেন না, এটি ফাইল সাইজ অনেক বাড়িয়ে দেয়।'
  },
  {
    id: 'cpanel-2',
    type: 'cpanel',
    stepNumber: 2,
    title: 'Folder Architecture in cPanel',
    banglaTitle: '২. সি-প্যানেলে ফোল্ডার স্ট্রাকচার সাজানো (সিকিউর মেথড)',
    englishDescription: 'In cPanel File Manager, create a folder outside `public_html` (e.g., `laravel_core`). Upload and extract your project zip into `laravel_core`. Then move only the files inside `laravel_core/public/` (index.php, .htaccess, robots.txt, build assets) directly into `public_html`.',
    description: 'cPanel File Manager-এ যান। রুট ডিরেক্টরিতে (public_html এর বাইরে) একটি নতুন ফোল্ডার বানান, যেমন: `laravel_core`। আপনার পুরো প্রজেক্টের জিপ ফাইলটি এই `laravel_core` ফোল্ডারে আপলোড করে Extract করুন। এরপর প্রজেক্টের ভেতরের `public` ফোল্ডারের সমস্ত ফাইল ও ফোল্ডার (যেমন index.php, .htaccess, robots.txt, build/vite) সরাসরি cPanel-এর মূল `public_html` ফোল্ডারে মুভ করে নিয়ে আসুন।',
    englishNote: 'Never put the root Laravel directory directly inside public_html. Exposing .env publicly is a severe security vulnerability.',
    importantNote: 'লারাভেলের কোর কোড এবং .env ফাইল যেন কখনো সরাসরি public_html এ না থাকে, তাহলে সিকিউরিটি রিস্ক তৈরি হয়।'
  },
  {
    id: 'cpanel-3',
    type: 'cpanel',
    stepNumber: 3,
    title: 'Edit index.php Path in public_html',
    banglaTitle: '৩. public_html এর index.php ফাইলে পাথ ঠিক করা',
    englishDescription: 'Open and edit `public_html/index.php`. Update the relative paths to point to your `laravel_core` directory where autoload.php and app.php reside:',
    description: 'এখন `public_html/index.php` ফাইলটি এডিট করে ওপেন করুন এবং ডিরেক্টরি পাথগুলো `laravel_core` ফোল্ডারের সাথে পয়েন্ট করে দিন:',
    codeSnippet: {
      title: 'public_html/index.php (Path Update)',
      language: 'php',
      code: `// Update autoload and bootstrap paths to laravel_core:
require __DIR__.'/../laravel_core/vendor/autoload.php';

$app = require_once __DIR__.'/../laravel_core/bootstrap/app.php';`
    }
  },
  {
    id: 'cpanel-4',
    type: 'cpanel',
    stepNumber: 4,
    title: 'Database Creation & .env Setup',
    banglaTitle: '৪. MySQL ডাটাবেজ তৈরি ও .env কনফিগারেশন',
    englishDescription: 'Navigate to `MySQL Databases` in cPanel. Create a new database, add a database user with a strong password, and grant `All Privileges`. Edit `laravel_core/.env` to configure DB credentials, and set `APP_ENV=production` with `APP_DEBUG=false`.',
    description: 'cPanel-এর `MySQL Databases` অপশনে যান। একটি নতুন ডাটাবেজ এবং ইউজার ক্রিয়েট করে সমস্ত প্রিভিলেজ (All Privileges) অ্যাসাইন করুন। এরপর `laravel_core/.env` ফাইলটি এডিট করে সার্ভারের ডাটাবেজ নাম, ইউজারনেম ও পাসওয়ার্ড বসিয়ে দিন। সাথে `APP_ENV=production` এবং `APP_DEBUG=false` করে দিন।',
    codeSnippet: {
      title: 'laravel_core/.env Configuration',
      language: 'ini',
      code: `APP_NAME="MyLaravelApp"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=cpaneluser_dbname
DB_USERNAME=cpaneluser_dbuser
DB_PASSWORD=your_secure_password`
    }
  },
  {
    id: 'cpanel-5',
    type: 'cpanel',
    stepNumber: 5,
    title: 'Import Database SQL & Migrations',
    banglaTitle: '৫. ডাটাবেজ ইমপোর্ট করা অথবা মাইগ্রেশন রান করা',
    englishDescription: 'If cPanel has Terminal access, run `php artisan migrate --force`. If no Terminal access is available, export SQL from your local phpMyAdmin and import the file using phpMyAdmin in cPanel.',
    description: 'যদি cPanel-এ Terminal এক্সেস থাকে, তবে সরাসরি `php artisan migrate --force` রান করতে পারেন। টার্মিনাল এক্সেস না থাকলে লোকাল ডাটাবেজ থেকে phpMyAdmin দিয়ে SQL এক্সপোর্ট করে cPanel-এর phpMyAdmin-এ ইমপোর্ট (Import) করে দিন।',
    commands: [
      'php artisan migrate --force',
      'php artisan optimize'
    ]
  },
  {
    id: 'cpanel-6',
    type: 'cpanel',
    stepNumber: 6,
    title: 'Create Storage Symlink in cPanel',
    banglaTitle: '৬. সি-প্যানেলে স্টোরেজ সিম্বলিক লিংক (Storage Symlink) তৈরি',
    englishDescription: 'If Terminal is active, run `php artisan storage:link`. If Terminal is unavailable, create a temporary `symlink.php` inside `public_html` and visit `yourdomain.com/symlink.php` once in your browser. Delete the script afterwards.',
    description: 'টার্মিনাল থাকলে `php artisan storage:link` দিন। টার্মিনাল না থাকলে `public_html` এ একটি `symlink.php` ফাইল বানিয়ে ব্রাউজারে `yourdomain.com/symlink.php` একবার ভিজিট করলেই লিংক তৈরি হয়ে যাবে! তৈরি হওয়ার পর ফাইলটি ডিলিট করে দেবেন।',
    codeSnippet: {
      title: 'public_html/symlink.php (Browser runner if no Terminal)',
      language: 'php',
      code: `<?php
$targetFolder = $_SERVER['DOCUMENT_ROOT'] . '/../laravel_core/storage/app/public';
$linkFolder = $_SERVER['DOCUMENT_ROOT'] . '/storage';
symlink($targetFolder, $linkFolder);
echo 'Storage Symlink created successfully!';
?>`
    }
  },
  {
    id: 'cpanel-7',
    type: 'cpanel',
    stepNumber: 7,
    title: 'File Permissions (775 & 755)',
    banglaTitle: '৭. ফোল্ডার পারমিশন ঠিক করা',
    englishDescription: 'Ensure `laravel_core/storage` and `laravel_core/bootstrap/cache` are granted 775 permissions (or 777 if required by shared hosting user permissions). Otherwise, Laravel throws a 500 Internal Server Error.',
    description: 'cPanel File Manager-এ `laravel_core/storage` এবং `laravel_core/bootstrap/cache` ফোল্ডারের পারমিশন ৭75 (বা প্রয়োজনে 777) নিশ্চিত করুন, অন্যথায় 500 Server Error দিতে পারে। অন্যান্য ফোল্ডারের জন্য 755 এবং ফাইলের জন্য 644 যথেষ্ট।',
    englishNote: 'Ensure the web server user has write permissions to storage and bootstrap/cache.',
    importantNote: 'storage এবং bootstrap/cache যেন ওয়েব সার্ভারের রাইট পারমিশন পায়।'
  }
];

export const VPS_STEPS: HostingStep[] = [
  {
    id: 'vps-1',
    type: 'vps',
    stepNumber: 1,
    title: 'Server Setup & Dependencies',
    banglaTitle: '১. সার্ভার আপডেট এবং প্রয়োজনীয় সফটওয়্যার ইন্সটল (Ubuntu + Nginx + PHP 8.3)',
    englishDescription: 'Log in to your fresh Ubuntu 22.04+ or 24.04 server via SSH. Update package index and install Nginx, MySQL, PHP 8.3 with all required Laravel extensions, Git, and Composer:',
    description: 'একটি ফ্রেশ উবুন্টু সার্ভারে SSH লগইন করে প্যাকেজ আপডেট ও Nginx, MySQL, PHP এবং Composer ইন্সটল করুন:',
    commands: [
      'sudo apt update && sudo apt upgrade -y',
      'sudo apt install nginx mysql-server php8.3-fpm php8.3-cli php8.3-mysql php8.3-mbstring php8.3-xml php8.3-bcmath php8.3-curl php8.3-zip unzip git -y',
      'curl -sS https://getcomposer.org/installer | php && sudo mv composer.phar /usr/local/bin/composer'
    ]
  },
  {
    id: 'vps-2',
    type: 'vps',
    stepNumber: 2,
    title: 'Clone Project via Git in /var/www',
    banglaTitle: '২. গিটহাবে থেকে প্রজেক্ট ক্লোন ও প্যাকেজ ইনস্টলেশন',
    englishDescription: 'Clone your repository into `/var/www/myapp`. Install optimized production Composer dependencies and generate the encryption key:',
    description: 'সার্ভারের `/var/www/` ফোল্ডারে প্রজেক্ট ক্লোন করুন এবং প্রডাকশন মোডে কম্পোজার ডিপেন্ডেন্সি ইন্সটল করুন:',
    commands: [
      'cd /var/www',
      'sudo git clone https://github.com/your-username/your-repo.git myapp',
      'cd myapp',
      'composer install --optimize-autoloader --no-dev',
      'cp .env.example .env',
      'php artisan key:generate'
    ]
  },
  {
    id: 'vps-3',
    type: 'vps',
    stepNumber: 3,
    title: 'File Permissions & Storage Link',
    banglaTitle: '৩. ফাইল ওনারশিপ (Nginx www-data) এবং পারমিশন',
    englishDescription: 'Set ownership of storage and cache directories to the Nginx user (`www-data`) and create the storage symlink for uploaded files:',
    description: 'সার্ভারকে স্টোরেজে ফাইল লেখার অনুমতি দিন এবং পাবলিক স্টোরেজ সিম্বলিক লিংক যুক্ত করুন:',
    commands: [
      'sudo chown -R www-data:www-data /var/www/myapp/storage /var/www/myapp/bootstrap/cache',
      'sudo chmod -R 775 /var/www/myapp/storage /var/www/myapp/bootstrap/cache',
      'php artisan storage:link'
    ]
  },
  {
    id: 'vps-4',
    type: 'vps',
    stepNumber: 4,
    title: 'Nginx Virtual Host Configuration',
    banglaTitle: '৪. Nginx কনফিগারেশন ফাইল তৈরি (/etc/nginx/sites-available/myapp)',
    englishDescription: 'Create a virtual host configuration pointing root to `/var/www/myapp/public` and routing requests through PHP-FPM:',
    description: 'Nginx-এ একটি নতুন ভার্চুয়াল হোস্ট ফাইল তৈরি করুন যা প্রজেক্টের /public ডিরেক্টরিকে পয়েন্ট করবে:',
    codeSnippet: {
      title: '/etc/nginx/sites-available/myapp',
      language: 'nginx',
      code: `server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/myapp/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php index.html;
    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \\.php$ {
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\\.(?!well-known).* {
        deny all;
    }
}`
    },
    commands: [
      'sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/',
      'sudo nginx -t',
      'sudo systemctl restart nginx'
    ]
  },
  {
    id: 'vps-5',
    type: 'vps',
    stepNumber: 5,
    title: 'Free SSL with Let\'s Encrypt (Certbot)',
    banglaTitle: '৫. ফ্রি SSL সার্টিফিকেট (HTTPS) সেটআপ',
    englishDescription: 'Install Certbot and obtain a free auto-renewing HTTPS certificate for your domain:',
    description: 'সার্টিবট ব্যবহার করে ১ মিনিটে ডোমেইনে ফ্রি অটো-রিনিউয়িং SSL ইনস্টল করুন:',
    commands: [
      'sudo apt install certbot python3-certbot-nginx -y',
      'sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com'
    ]
  },
  {
    id: 'vps-6',
    type: 'vps',
    stepNumber: 6,
    title: 'Production Cache & Speed Optimization',
    banglaTitle: '৬. প্রডাকশন স্পিড অপ্টিমাইজেশন ও ক্যাশ তৈরি',
    englishDescription: 'Run Laravel production caching commands to precompile routes, configs, and blade views for maximum performance:',
    description: 'প্রজেক্ট ফোল্ডারে ঢুকে লারাভেলের প্রডাকশন ক্যাশ কমান্ডগুলো রান করুন:',
    commands: [
      'php artisan config:cache',
      'php artisan route:cache',
      'php artisan view:cache',
      'php artisan event:cache'
    ]
  },
  {
    id: 'vps-7',
    type: 'vps',
    stepNumber: 7,
    title: 'Background Cron Task Scheduler',
    banglaTitle: '৭. লারাভেল টাস্ক শিডিউলার (Cron Job) কনফিগারেশন',
    englishDescription: 'Configure the crontab to trigger Laravel\'s task scheduler every single minute:',
    description: 'লারাভেলের শিডিউল টাস্ক প্রতি মিনিটে চালানোর জন্য ক্রনট্যাব সেট করুন:',
    codeSnippet: {
      title: 'crontab -e Configuration',
      language: 'bash',
      code: `* * * * * cd /var/www/myapp && php artisan schedule:run >> /dev/null 2>&1`
    }
  }
];

export const PRODUCTION_CHECKLIST: ProductionChecklistItem[] = [
  {
    title: 'APP_DEBUG=false',
    englishTitle: 'APP_DEBUG=false',
    desc: 'প্রডাকশন সার্ভারে কখনোই ডিবাগ অন রাখবেন না, নয়তো ডাটাবেজ পাসওয়ার্ড বা সেনসিটিভ কোড ইউজাররা এরর পেজে দেখতে পাবে।',
    englishDesc: 'Never leave debug mode true in production. It prevents database credentials, stack traces, and server environment variables from leaking to visitors.'
  },
  {
    title: 'APP_ENV=production',
    englishTitle: 'APP_ENV=production',
    desc: 'এনভায়রনমেন্ট ভ্যারিয়েবল প্রডাকশনে সেট রাখুন যাতে অপ্টিমাইজড সার্ভিস প্রোভাইডার লোড হয়।',
    englishDesc: 'Sets the application environment to production so optimized service providers and caching mechanics take effect.'
  },
  {
    title: 'Verify Storage Symlink',
    englishTitle: 'Verify Storage Symlink',
    desc: 'php artisan storage:link ঠিকমতো রান হয়েছে কি না নিশ্চিত হোন, নইলে আপলোড করা ছবি সাইটে ভাঙা দেখাবে।',
    englishDesc: 'Ensure `php artisan storage:link` has executed so public image uploads in storage/app/public resolve properly without 404 errors.'
  },
  {
    title: 'Folder Permissions (storage & bootstrap/cache)',
    englishTitle: 'Folder Permissions (storage & bootstrap/cache)',
    desc: 'নিশ্চিত করুন সার্ভারের ওয়েব ইউজার (যেমন www-data) এই দুটি ফোল্ডারে ফাইল লিখতে পারছে।',
    englishDesc: 'Ensure web server process (e.g. www-data) has write permissions (chmod 775) on storage and bootstrap/cache to avoid 500 error.'
  },
  {
    title: 'Composer --no-dev Optimization',
    englishTitle: 'Composer --no-dev Optimization',
    desc: 'প্রডাকশনে কোনো টেস্ট প্যাকেজ যেন ইনস্টল না থাকে (composer install --optimize-autoloader --no-dev)।',
    englishDesc: 'Install production dependencies with `--optimize-autoloader --no-dev` to strip test frameworks and generate a high-speed class map.'
  },
  {
    title: 'Enforce HTTPS & Secure Cookies',
    englishTitle: 'Enforce HTTPS & Secure Cookies',
    desc: 'সার্ভারে SSL সার্টিফিকেট এক্টিভ রাখা এবং সমস্ত HTTP ট্রাফিক স্বয়ংক্রিয়ভাবে HTTPS এ রিডাইরেক্ট করা।',
    englishDesc: 'Activate SSL certificate and redirect all insecure HTTP traffic to HTTPS to safeguard session cookies and data transmission.'
  }
];
