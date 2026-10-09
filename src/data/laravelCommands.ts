import { LaravelCommand } from '../types';

export const LARAVEL_COMMANDS: LaravelCommand[] = [
  // 1. Project Setup & Run
  {
    id: 'composer-create-project',
    command: 'composer create-project laravel/laravel my-project',
    title: 'Install New Laravel Project',
    banglaTitle: '১. নতুন লারাভেল প্রজেক্ট ইন্সটল করা',
    category: 'setup',
    englishExplanation: 'Downloads the latest Laravel release and installs all core dependencies via Composer. Replace "my-project" with your desired project directory name.',
    banglaExplanation: 'কম্পোজারের মাধ্যমে লারাভেলের লেটেস্ট ফ্রেশ প্রজেক্ট ডাউনলোড ও প্রয়োজনীয় ডিপেন্ডেন্সি ইনিশিয়ালাইজ করতে এই কমান্ড দেওয়া হয়। my-project এর জায়গায় আপনার কাঙ্ক্ষিত ফোল্ডার নেম দিন।',
    tags: ['composer', 'install', 'create', 'new project', 'setup'],
    isEssential: true,
    exampleOutput: 'Creating a "laravel/laravel" project at "./my-project"\nInstalling dependencies from lock file...\nApplication key set successfully.'
  },
  {
    id: 'artisan-serve',
    command: 'php artisan serve',
    title: 'Start Local Development Server',
    banglaTitle: 'লোকাল ডেভেলপমেন্ট সার্ভার চালু করা',
    category: 'setup',
    englishExplanation: 'Starts the built-in PHP development server on localhost (default: http://127.0.0.1:8000). Use --port to specify a custom port or --host=0.0.0.0 to access from other devices.',
    banglaExplanation: 'লোকাল মেশিনে লোকালহোস্টে প্রজেক্ট রান করার জন্য বিল্ট-ইন পিএইচপি সার্ভার চালু করে (ডিফল্ট: http://127.0.0.1:8000)। পোর্ট চেঞ্জ করতে চাইলে `--port=8080` যোগ করতে পারেন।',
    flags: [
      { flag: '--port=8080', description: 'নির্দিষ্ট পোর্ট নম্বরে সার্ভার চালাতে', englishDescription: 'Serve on custom port' },
      { flag: '--host=0.0.0.0', description: 'লোকাল নেটওয়ার্কে মোবাইল বা অন্য ডিভাইস থেকে এক্সেস করতে', englishDescription: 'Allow network access' }
    ],
    tags: ['serve', 'server', 'localhost', 'run', 'port'],
    isEssential: true,
    exampleOutput: '   INFO  Server running on [http://127.0.0.1:8000].\n\n  Press Ctrl+C to stop the server'
  },
  {
    id: 'key-generate',
    command: 'php artisan key:generate',
    title: 'Generate Application Key (APP_KEY)',
    banglaTitle: 'অ্যাপ্লিকেশন সিকিউরিটি কি (APP_KEY) জেনারেট করা',
    category: 'setup',
    englishExplanation: 'Generates a secure 32-character random encryption key and sets the APP_KEY value in your .env file. Required for user sessions and data encryption security.',
    banglaExplanation: 'প্রজেক্টের .env ফাইলে ৩২ অক্ষরের র্যান্ডম APP_KEY তৈরি বা আপডেট করে। এই কি ইউজার সেশন ও এনক্রিপ্টেড ডাটা সুরক্ষায় অপরিহার্য। প্রজেক্ট ক্লোন করার পর এটি রান করতে হয়।',
    tags: ['key', 'security', 'env', 'app_key', 'encryption'],
    isEssential: true,
    exampleOutput: '   INFO  Application key set successfully.'
  },

  // 2. Maker Commands
  {
    id: 'make-model',
    command: 'php artisan make:model ModelName',
    title: 'Create Eloquent Model',
    banglaTitle: '২. নতুন মডেল তৈরি করা',
    category: 'make',
    englishExplanation: 'Generates a new Eloquent Model class in app/Models/ModelName.php to interact with the database table. Example: php artisan make:model Product',
    banglaExplanation: 'ডাটাবেজ টেবিলের সাথে কাজ করার জন্য `app/Models/ModelName.php` এ একটি নতুন Eloquent Model ক্লাস তৈরি করে। (উদাহরণ: `php artisan make:model Product`)',
    tags: ['model', 'eloquent', 'database', 'make'],
    isEssential: true,
    exampleOutput: '   INFO  Model [app/Models/Product.php] created successfully.'
  },
  {
    id: 'make-controller',
    command: 'php artisan make:controller ControllerName',
    title: 'Create Controller',
    banglaTitle: 'নতুন সাধারণ কন্ট্রোলার তৈরি করা',
    category: 'make',
    englishExplanation: 'Generates a basic HTTP controller class in app/Http/Controllers/ for handling requests and business logic. Example: php artisan make:controller PostController',
    banglaExplanation: 'বিজনেস লজিক এবং রিকোয়েস্ট হ্যান্ডেল করার জন্য `app/Http/Controllers/` এ খালি কন্ট্রোলার তৈরি করে। (উদাহরণ: `php artisan make:controller PostController`)',
    tags: ['controller', 'http', 'make'],
    isEssential: true,
    exampleOutput: '   INFO  Controller [app/Http/Controllers/PostController.php] created successfully.'
  },
  {
    id: 'make-controller-resource',
    command: 'php artisan make:controller ControllerName -r',
    title: 'Create Resource Controller (CRUD)',
    banglaTitle: 'রিসোর্স কন্ট্রোলার তৈরি করা (CRUD মেথডস সহ)',
    category: 'make',
    englishExplanation: 'Generates a complete Resource Controller containing all 7 standard CRUD actions: index, create, store, show, edit, update, destroy.',
    banglaExplanation: 'CRUD (Create, Read, Update, Delete) অপারেশনের জন্য index, create, store, show, edit, update, destroy মেথডগুলো সহ রেডিমেড কন্ট্রোলার তৈরি করে।',
    flags: [
      { flag: '-r, --resource', description: 'সব ৭টি স্ট্যান্ডার্ড রিসোর্স মেথড তৈরি করবে', englishDescription: 'Scaffolds all 7 standard CRUD methods' },
      { flag: '--model=ModelName', description: 'নির্দিষ্ট মডেল সরাসরি মেথড সিগনেচারে বাইন্ড করতে', englishDescription: 'Injects model type-hinting' }
    ],
    tags: ['controller', 'resource', 'crud', 'make'],
    isEssential: true,
    exampleOutput: '   INFO  Controller [app/Http/Controllers/PostController.php] created successfully.'
  },
  {
    id: 'make-controller-api',
    command: 'php artisan make:controller Api/ControllerName --api',
    title: 'Create API Resource Controller',
    banglaTitle: 'API রিসোর্স কন্ট্রোলার তৈরি করা',
    category: 'make',
    englishExplanation: 'Generates an API controller excluding blade views (create and edit methods omitted), focusing solely on JSON endpoints: index, store, show, update, destroy.',
    banglaExplanation: 'মোবাইল অ্যাপ বা ফ্রন্টএন্ড API এর জন্য কন্ট্রোলার তৈরি করে। এতে Blade ভিউ প্রয়োজন না হওয়ায় create ও edit মেথড বাদ দিয়ে শুধু API মেথডগুলো থাকে।',
    tags: ['controller', 'api', 'json', 'rest'],
    exampleOutput: '   INFO  Controller [app/Http/Controllers/Api/PostController.php] created successfully.'
  },
  {
    id: 'make-migration',
    command: 'php artisan make:migration create_table_name_table',
    title: 'Create Database Migration',
    banglaTitle: 'ডাটাবেজ মাইগ্রেশন ফাইল তৈরি করা',
    category: 'make',
    englishExplanation: 'Creates a timestamped migration schema file in database/migrations/ for defining table structure, columns, indexes, and foreign keys.',
    banglaExplanation: 'নতুন ডাটাবেজ টেবিল ডিফাইন করতে `database/migrations/` ফোল্ডারে টাইমস্ট্যাম্প সহ একটি নতুন মাইগ্রেশন ফাইল তৈরি করে। (উদাহরণ: `create_products_table`)',
    tags: ['migration', 'database', 'schema', 'table'],
    isEssential: true,
    exampleOutput: '   INFO  Migration [database/migrations/2026_10_08_create_products_table.php] created successfully.'
  },
  {
    id: 'make-seeder',
    command: 'php artisan make:seeder SeederName',
    title: 'Create Database Seeder',
    banglaTitle: 'ডাটাবেজ সিডার ফাইল তৈরি করা',
    category: 'make',
    englishExplanation: 'Creates a seeder file in database/seeders/ for populating tables with initial sample, mock, or fake test data using factories.',
    banglaExplanation: 'ডাটাবেজে প্রাথমিক টেস্ট ডাটা বা ডামি ফেক ডাটা পুশ করার জন্য `database/seeders/` ফোল্ডারে সিডার ফাইল তৈরি করে। (যেমন: `AdminUserSeeder`)',
    tags: ['seeder', 'dummy data', 'faker', 'seed'],
    exampleOutput: '   INFO  Seeder [database/seeders/ProductSeeder.php] created successfully.'
  },
  {
    id: 'make-request',
    command: 'php artisan make:request RequestName',
    title: 'Create Form Request Validation',
    banglaTitle: 'ফর্ম ভ্যালিডেশনের জন্য রিকোয়েস্ট তৈরি করা',
    category: 'make',
    englishExplanation: 'Creates a custom Form Request class in app/Http/Requests/ to encapsulate complex input validation rules and authorization logic away from controllers.',
    banglaExplanation: 'কন্ট্রোলার ক্লিন রাখতে ফর্ম ইনপুট ভ্যালিডেশন এবং অথরাইজেশন আলাদা ক্লাসে হ্যান্ডেল করার জন্য `app/Http/Requests/` এ রিকোয়েস্ট ফাইল তৈরি করে।',
    tags: ['request', 'validation', 'form', 'security'],
    exampleOutput: '   INFO  Request [app/Http/Requests/StoreProductRequest.php] created successfully.'
  },
  {
    id: 'make-middleware',
    command: 'php artisan make:middleware MiddlewareName',
    title: 'Create HTTP Middleware',
    banglaTitle: 'রিকোয়েস্ট ফিল্টার বা মিডলওয়্যার তৈরি করা',
    category: 'make',
    englishExplanation: 'Creates a custom HTTP middleware in app/Http/Middleware/ to filter incoming requests before reaching route handlers (e.g., role checks, authentication guards).',
    banglaExplanation: 'HTTP রিকোয়েস্ট প্রসেস হওয়ার আগে ফিল্টার করতে `app/Http/Middleware/` এ মিডলওয়্যার ক্লাস তৈরি করে (যেমন: অ্যাডমিন চেক, রোল চেক, এইজ ভেরিফিকেশন)।',
    tags: ['middleware', 'filter', 'guard', 'auth'],
    exampleOutput: '   INFO  Middleware [app/Http/Middleware/CheckAdmin.php] created successfully.'
  },

  // Model Combinations / Shortcuts
  {
    id: 'make-model-m',
    command: 'php artisan make:model ModelName -m',
    title: 'Model + Migration Shortcut',
    banglaTitle: 'মডেল এবং মাইগ্রেশন একসাথে তৈরি করা',
    category: 'make',
    englishExplanation: 'Creates an Eloquent Model and its corresponding database migration file in a single command.',
    banglaExplanation: 'একটি মাত্র কমান্ডে Eloquent Model এবং তার সাথে সম্পর্কিত ডাটাবেজ Migration ফাইল তৈরি হয়ে যায়। সময় বাঁচানোর জন্য দারুণ কার্যকর!',
    flags: [{ flag: '-m, --migration', description: 'মডেলের পাশাপাশি মাইগ্রেশন ফাইলও তৈরি করবে', englishDescription: 'Creates database migration' }],
    tags: ['shortcut', 'model', 'migration', 'fast'],
    isEssential: true,
    exampleOutput: '   INFO  Model [app/Models/Product.php] created successfully.\n   INFO  Migration [database/migrations/2026_10_08_create_products_table.php] created successfully.'
  },
  {
    id: 'make-model-mc',
    command: 'php artisan make:model ModelName -mc',
    title: 'Model + Migration + Controller',
    banglaTitle: 'মডেল, মাইগ্রেশন এবং কন্ট্রোলার একসাথে তৈরি',
    category: 'make',
    englishExplanation: 'Creates an Eloquent Model, a migration file, and a standard controller in one swift action.',
    banglaExplanation: 'এক সাথে মডেল, মাইগ্রেশন এবং একটি বেসিক কন্ট্রোলার ফাইল বানিয়ে দেয়।',
    flags: [
      { flag: '-m', description: 'মাইগ্রেশন ফাইল', englishDescription: 'Migration file' },
      { flag: '-c', description: 'কন্ট্রোলার ফাইল', englishDescription: 'Controller file' }
    ],
    tags: ['shortcut', 'model', 'controller', 'migration'],
    isEssential: true,
    exampleOutput: '   INFO  Model [app/Models/Order.php] created successfully.\n   INFO  Migration [database/migrations/..._create_orders_table.php] created successfully.\n   INFO  Controller [app/Http/Controllers/OrderController.php] created successfully.'
  },
  {
    id: 'make-model-mcr',
    command: 'php artisan make:model ModelName -mcr',
    title: 'Model + Migration + Resource Controller (Most Popular)',
    banglaTitle: 'মডেল, মাইগ্রেশন ও রিসোর্স কন্ট্রোলার (সবচেয়ে বেশি ব্যবহৃত)',
    category: 'make',
    englishExplanation: 'The most popular Laravel shortcut! Scaffolds an Eloquent Model, a migration file, and a complete Resource Controller with 7 CRUD methods.',
    banglaExplanation: 'লারাভেল ডেভেলপারদের সবচেয়ে জনপ্রিয় শর্টকাট! এটি মডেল, মাইগ্রেশন এবং ৭টি CRUD মেথড সহ একটি পূর্ণাঙ্গ রিসোর্স কন্ট্রোলার তৈরি করে দেয়।',
    flags: [
      { flag: '-m', description: 'মাইগ্রেশন', englishDescription: 'Migration' },
      { flag: '-c', description: 'কন্ট্রোলার', englishDescription: 'Controller' },
      { flag: '-r', description: 'রিসোর্স মেথডসমূহ', englishDescription: 'Resource CRUD methods' }
    ],
    tags: ['shortcut', 'favorite', 'crud', 'model', 'migration', 'resource'],
    isEssential: true,
    exampleOutput: '   INFO  Model [app/Models/Category.php] created successfully.\n   INFO  Migration [database/migrations/..._create_categories_table.php] created successfully.\n   INFO  Controller [app/Http/Controllers/CategoryController.php] created successfully.'
  },
  {
    id: 'make-model-all',
    command: 'php artisan make:model ModelName -a',
    title: 'All-in-One Generator (-a / --all)',
    banglaTitle: 'মডেলের সবকিছু একসাথে তৈরি (-a অল-ইন-ওয়ান)',
    category: 'make',
    englishExplanation: 'Generates everything for a model: Migration, Factory, Seeder, Resource Controller, and Policy with a single flag.',
    banglaExplanation: 'মডেল, মাইগ্রেশন, রিসোর্স কন্ট্রোলার, পলিসি, সিডার এবং ফ্যাক্টরি — সবকিছু এক ক্লিকে বানিয়ে দেয়!',
    flags: [{ flag: '-a, --all', description: 'Migration, Seeder, Factory, Policy, Resource Controller', englishDescription: 'Scaffolds all related files' }],
    tags: ['all', 'shortcut', 'complete', 'artisan'],
    exampleOutput: '   INFO  Model [app/Models/Course.php] created successfully.\n   INFO  Migration [database/migrations/..._create_courses_table.php] created successfully.\n   INFO  Factory [database/factories/CourseFactory.php] created successfully.\n   INFO  Seeder [database/seeders/CourseSeeder.php] created successfully.\n   INFO  Controller [app/Http/Controllers/CourseController.php] created successfully.\n   INFO  Policy [app/Policies/CoursePolicy.php] created successfully.'
  },

  // 3. Database & Migrations
  {
    id: 'migrate',
    command: 'php artisan migrate',
    title: 'Run Pending Migrations',
    banglaTitle: '৩. নতুন মাইগ্রেশন রান করা (টেবিল তৈরি)',
    category: 'database',
    englishExplanation: 'Executes all outstanding migration files against your configured database, creating or altering tables and columns.',
    banglaExplanation: 'যেসব মাইগ্রেশন এখনো ডাটাবেজে রান হয়নি, সেগুলোকে এক্সিকিউট করে ডাটাবেজে টেবিল ও কলাম তৈরি করে।',
    tags: ['migrate', 'database', 'schema', 'table'],
    isEssential: true,
    exampleOutput: '   INFO  Running migrations.\n  2026_10_08_create_products_table ........................... 18ms DONE'
  },
  {
    id: 'migrate-rollback',
    command: 'php artisan migrate:rollback',
    title: 'Rollback Last Migration Batch',
    banglaTitle: 'সর্বশেষ মাইগ্রেশন পরিবর্তন বাতিল (Rollback) করা',
    category: 'database',
    englishExplanation: 'Reverses the last executed migration batch. Use --step=1 to revert only a specified number of migrations.',
    banglaExplanation: 'সর্বশেষ রান করা মাইগ্রেশন ব্যাচটিকে বাতিল করে ড্রপ করে দেয়। শুধু ১টি বা ২টি স্টেপ রিভার্স করতে `--step=1` ফ্ল্যাগ ব্যবহার করা যায়।',
    flags: [{ flag: '--step=1', description: 'নির্দিষ্ট সংখ্যক স্টেপ পূর্বাবস্থায় ফিরিয়ে নিতে', englishDescription: 'Rollback specific number of steps' }],
    tags: ['rollback', 'undo', 'migration', 'database'],
    isEssential: true,
    exampleOutput: '   INFO  Rolling back migrations.\n  2026_10_08_create_products_table ........................... 12ms DONE'
  },
  {
    id: 'migrate-fresh',
    command: 'php artisan migrate:fresh',
    title: 'Drop All Tables & Re-run All Migrations',
    banglaTitle: 'সব টেবিল ড্রপ করে নতুন করে মাইগ্রেশন রান করা',
    category: 'database',
    englishExplanation: 'Drops all existing database tables and executes all migrations from scratch. WARNING: Deletes all database records!',
    banglaExplanation: 'ডাটাবেজের সমস্ত আগের টেবিল মুছে (Drop) দিয়ে একদম শুরু থেকে ক্লিনভাবে সবগুলো মাইগ্রেশন ফাইল পুনরায় রান করে। সতর্কতা: ডাটাবেজের সব ডাটা ডিলিট হয়ে যাবে!',
    tags: ['fresh', 'reset', 'drop', 'database'],
    isEssential: true,
    exampleOutput: '   INFO  Dropping all tables.\n   INFO  Running migrations.\n  0001_01_01_000000_create_users_table ....................... 24ms DONE\n  2026_10_08_000001_create_products_table .................... 14ms DONE'
  },
  {
    id: 'migrate-fresh-seed',
    command: 'php artisan migrate:fresh --seed',
    title: 'Fresh Migrations + Seed Database',
    banglaTitle: 'ফ্রেশ মাইগ্রেশন + ডামি ডাটা ইনসার্ট একসাথে',
    category: 'database',
    englishExplanation: 'Drops all tables, re-runs all migrations, and immediately executes database seeders to populate initial dummy/sample data.',
    banglaExplanation: 'সব টেবিল নতুন করে তৈরি করার সাথে সাথে DatabaseSeeder স্বয়ংক্রিয়ভাবে এক্সিকিউট করে ডামি বা ইনিশিয়াল ডাটা লোড করে দেয়। ডেভেলপমেন্টে এটি অত্যন্ত উপকারী।',
    tags: ['fresh', 'seed', 'reset', 'dummy data'],
    isEssential: true,
    exampleOutput: '   INFO  Dropping all tables.\n   INFO  Running migrations.\n   INFO  Seeding database.\n  Database\\Seeders\\DatabaseSeeder ........................... 45ms DONE'
  },
  {
    id: 'db-seed',
    command: 'php artisan db:seed',
    title: 'Run Database Seeders',
    banglaTitle: 'সিডার ফাইলের মাধ্যমে ডাটা প্রবেশ করানো',
    category: 'database',
    englishExplanation: 'Runs database seeders (DatabaseSeeder by default). Use --class=UserSeeder to execute an individual seeder class.',
    banglaExplanation: 'DatabaseSeeder রান করে টেস্ট ডাটা ইনসার্ট করে। নির্দিষ্ট কোনো সিডার আলাদাভাবে রান করতে চাইলে `--class=UserSeeder` লিখতে হয়।',
    flags: [{ flag: '--class=UserSeeder', description: 'নির্দিষ্ট সিডার ফাইলটি এককভাবে চালাতে', englishDescription: 'Run specific seeder class' }],
    tags: ['seed', 'faker', 'database'],
    exampleOutput: '   INFO  Seeding database.\n  Database\\Seeders\\UserSeeder ................................ 32ms DONE'
  },
  {
    id: 'migrate-status',
    command: 'php artisan migrate:status',
    title: 'Check Migration Status',
    banglaTitle: 'মাইগ্রেশনের রান স্ট্যাটাস চেক করা',
    category: 'database',
    englishExplanation: 'Outputs a formatted table showing which migrations have run (with batch number) and which remain pending.',
    banglaExplanation: 'কোন কোন মাইগ্রেশন ফাইলে `Ran` (রান হয়েছে) এবং কোনগুলোতে `Pending` আছে তার তালিকা টেবিল আকারে প্রদর্শন করে।',
    tags: ['status', 'migrate', 'check'],
    exampleOutput: '  Migration name .................................... Batch / Status\n  0001_01_01_000000_create_users_table .............. [1] Ran\n  2026_10_08_000001_create_products_table ........... [Pending]'
  },

  // 4. Cache & Optimization
  {
    id: 'cache-clear',
    command: 'php artisan cache:clear',
    title: 'Clear Application Cache',
    banglaTitle: '৪. অ্যাপ্লিকেশনের সব ক্যাশ ক্লিয়ার করা',
    category: 'cache',
    englishExplanation: 'Flushes the application data cache from configured drivers (file, redis, memcached, database).',
    banglaExplanation: 'লারাভেল অ্যাপ্লিকেশনের জমা থাকা ডাটা ক্যাশ (Redis, File, Memcached ইত্যাদি) মুছে ফেলে সম্পূর্ণ রিফ্রেশ করে।',
    tags: ['cache', 'clear', 'performance'],
    isEssential: true,
    exampleOutput: '   INFO  Application cache cleared successfully.'
  },
  {
    id: 'config-clear',
    command: 'php artisan config:clear',
    title: 'Clear Configuration Cache',
    banglaTitle: 'কনফিগারেশন ক্যাশ ক্লিয়ার করা',
    category: 'cache',
    englishExplanation: 'Clears cached configuration files. Run this command whenever you change your .env file or files in config/ directory.',
    banglaExplanation: '.env ফাইল বা config ফোল্ডারের ফাইল পরিবর্তন করার পর অনেক সময় পরিবর্তন না দেখা গেলে এই কমান্ড দিতে হয়। এটি ক্যাশ হওয়া কনফিগ ডিলিট করে।',
    tags: ['config', 'clear', 'env'],
    isEssential: true,
    exampleOutput: '   INFO  Configuration cache cleared successfully.'
  },
  {
    id: 'route-clear',
    command: 'php artisan route:clear',
    title: 'Clear Route Cache',
    banglaTitle: 'রাউট ক্যাশ ক্লিয়ার করা',
    category: 'cache',
    englishExplanation: 'Removes the cached route map file. Essential if newly defined routes return 404 Not Found errors.',
    banglaExplanation: 'রাউটে নতুন পরিবর্তন করার পর যদি 404 নট ফাউন্ড বা পুরানো রাউট লোড হয়, তবে রাউট ক্যাশ ডিলিট করতে এই কমান্ড কাজে আসে।',
    tags: ['route', 'clear', 'routing'],
    isEssential: true,
    exampleOutput: '   INFO  Route cache cleared successfully.'
  },
  {
    id: 'view-clear',
    command: 'php artisan view:clear',
    title: 'Clear Compiled Blade Views',
    banglaTitle: 'কম্পাইল্ড ব্লেড ভিউজ ক্যাশ ক্লিয়ার করা',
    category: 'cache',
    englishExplanation: 'Clears all pre-compiled Blade templates from storage/framework/views/.',
    banglaExplanation: 'ব্লেড টেমপ্লেটের ক্যাশ ফাইলগুলো মুছে ফেলে ফ্রেশ করে।',
    tags: ['view', 'blade', 'clear'],
    exampleOutput: '   INFO  Compiled views cleared successfully.'
  },
  {
    id: 'optimize-clear',
    command: 'php artisan optimize:clear',
    title: 'Clear All Caches (Master Cleaner)',
    banglaTitle: 'সব ধরণের ক্যাশ এক ক্লিকে ক্লিয়ার করা (মাস্টার ক্লিনার)',
    category: 'cache',
    englishExplanation: 'The ultimate troubleshooting command! Clears configuration, routes, compiled views, events, and application cache in one shot.',
    banglaExplanation: 'সবচেয়ে প্রয়োজনীয় ট্রাবলশুটিং কমান্ড! এটি কনফিগ, রাউট, ভিউ, ইভেন্ট এবং অ্যাপ্লিকেশন ক্যাশ একসাথে ডিলিট করে দেয়।',
    tags: ['optimize:clear', 'all', 'clean', 'troubleshoot'],
    isEssential: true,
    exampleOutput: '   INFO  Configuration cache cleared successfully.\n   INFO  Route cache cleared successfully.\n   INFO  Compiled views cleared successfully.\n   INFO  Application cache cleared successfully.'
  },
  {
    id: 'optimize',
    command: 'php artisan optimize',
    title: 'Cache Config & Routes for Production',
    banglaTitle: 'প্রডাকশনের জন্য কনফিগারেশন ও রাউট অপ্টিমাইজ করা',
    category: 'cache',
    englishExplanation: 'Compiles configuration and routing trees into cached files to boost production performance and reduce disk I/O latency.',
    banglaExplanation: 'প্রডাকশন সার্ভারে লারাভেল সাইট সুপার-ফাস্ট করার জন্য কনফিগারেশন এবং রাউটকে একসাথে ক্যাশ করে ফেলে যাতে প্রতি রিকোয়েস্টে ফাইল রিড করতে না হয়।',
    tags: ['optimize', 'production', 'speed', 'fast'],
    isEssential: true,
    exampleOutput: '   INFO  Configuration cached successfully.\n   INFO  Routes cached successfully.'
  },

  // 5. Routes & Utilities
  {
    id: 'route-list',
    command: 'php artisan route:list',
    title: 'List All Registered Routes',
    banglaTitle: '৫. সব রেজিস্টার্ড রাউটের লিস্ট দেখা',
    category: 'route',
    englishExplanation: 'Displays a formatted terminal table of all registered URI endpoints, HTTP verbs (GET, POST), route names, and controller actions.',
    banglaExplanation: 'অ্যাপ্লিকেশনের কোন কোন URL রাউট রেজিস্টার করা আছে, তাদের HTTP মেথড (GET, POST), নেম ও কন্ট্রোলার মেথডের সম্পূর্ণ তালিকা টার্মিনালে দেখতে।',
    flags: [
      { flag: '--path=api', description: 'শুধুমাত্র নির্দিষ্ট পাথের (যেমন api) রাউট দেখতে', englishDescription: 'Filter by path prefix' },
      { flag: '--method=POST', description: 'নির্দিষ্ট মেথডের রাউট দেখতে', englishDescription: 'Filter by HTTP method' }
    ],
    tags: ['routes', 'list', 'terminal', 'debug'],
    isEssential: true,
    exampleOutput: '  GET|HEAD   / ..................................................... home\n  POST       /login ................................................ login.store\n  GET|HEAD   /api/products ......................................... products.index\n  POST       /api/products ......................................... products.store'
  },
  {
    id: 'artisan-tinker',
    command: 'php artisan tinker',
    title: 'Artisan Tinker Interactive REPL',
    banglaTitle: 'লারাভেল টিংকার ইন্টারেক্টিভ শেল',
    category: 'route',
    englishExplanation: 'Opens an interactive command-line shell allowing you to interact with your Eloquent models, run database queries, and test PHP code live in terminal.',
    banglaExplanation: 'টার্মিনালে সরাসরি লারাভেলের Eloquent কোড এবং ডাটাবেজ কুয়েরি টেস্ট করার জন্য ইন্টারেক্টিভ শেল। যেমন: `App\\Models\\User::all()` সরাসরি লিখে টেস্ট করা যায়।',
    tags: ['tinker', 'repl', 'interactive', 'test', 'eloquent'],
    isEssential: true,
    exampleOutput: 'Psy Shell v0.12.0 (PHP 8.3.0 — cli) by Justin Hileman\n> App\\Models\\User::count();\n= 15\n> exit'
  },
  {
    id: 'about',
    command: 'php artisan about',
    title: 'System & Environment Information',
    banglaTitle: 'সিস্টেম ও লারাভেলের পরিবেশ সংক্রান্ত তথ্য',
    category: 'route',
    englishExplanation: 'Displays an overview of your Laravel application configuration, framework version, PHP version, database driver, cache driver, and environment.',
    banglaExplanation: 'লারাভেল ভার্সন, পিএইচপি ভার্সন, ক্যাশ ড্রাইভার, ডাটাবেজ ড্রাইভার ও সার্ভার কনফিগারেশনের সামারি এক নজরে দেখতে সাহায্য করে।',
    tags: ['about', 'version', 'system', 'info'],
    exampleOutput: '  Environment .................................................. local\n  Laravel Version .............................................. 11.x\n  PHP Version .................................................. 8.3.x\n  Database ..................................................... mysql'
  },

  // 6. File Uploads & Storage
  {
    id: 'storage-link',
    command: 'php artisan storage:link',
    title: 'Create Storage Symbolic Link',
    banglaTitle: '৬. ফাইল আপলোড ও স্টোরেজ সিম্বলিক লিংক তৈরি',
    category: 'storage',
    englishExplanation: 'Creates a symbolic link connecting public/storage to storage/app/public. Mandatory for making uploaded files, photos, and media publicly accessible via browser.',
    banglaExplanation: '`public/storage` এর সাথে `storage/app/public` ফোল্ডারের সিম্বলিক লিংক (Symlink) তৈরি করে। প্রোফাইল পিকচার বা যেকোনো ফাইল আপলোড করে তা ব্রাউজারে পাবলিকলি এক্সেস করার জন্য এটি আবশ্যক!',
    tags: ['storage', 'upload', 'symlink', 'images', 'public'],
    isEssential: true,
    exampleOutput: '   INFO  The [public/storage] link has been connected to [storage/app/public].'
  },

  // 7. Authentication (Laravel Breeze)
  {
    id: 'breeze-install-package',
    command: 'composer require laravel/breeze --dev',
    title: 'Install Laravel Breeze Package',
    banglaTitle: '৭. Laravel Breeze প্যাকেজ ইন্সটল করা',
    category: 'auth',
    englishExplanation: 'Installs the official Laravel Breeze package as a dev dependency to scaffold login, registration, password reset, and user verification.',
    banglaExplanation: 'লারাভেলে খুব সহজে এবং দ্রুত লগইন, রেজিস্ট্রেশন, পাসওয়ার্ড রিসেট ও ড্যাশবোর্ড স্ক্রিন তৈরি করার জন্য অফিশিয়াল Breeze প্যাকেজটি ডেভেলপমেন্ট ডিপেন্ডেন্সি হিসেবে যুক্ত করে।',
    tags: ['breeze', 'auth', 'login', 'register'],
    isEssential: true,
    exampleOutput: 'Installing laravel/breeze (v2.x.x)\nGenerating optimized autoload files'
  },
  {
    id: 'breeze-scaffold',
    command: 'php artisan breeze:install',
    title: 'Scaffold Breeze Authentication Views',
    banglaTitle: 'Breeze স্ক্যাফোল্ডিং ইনস্টল করা (Blade/React/Vue)',
    category: 'auth',
    englishExplanation: 'Runs the Breeze installer prompt to generate controllers, routes, and views based on your stack choice (Blade, React, Vue, Livewire, or API-only).',
    banglaExplanation: 'Breeze কমান্ড রান করলে স্ট্যাক চয়েস অপশন দেয় (Blade, Livewire, React, বা Vue)। Blade নির্বাচন করলে প্রয়োজনীয় সমস্ত কন্ট্রোলার এবং ভিউজ কোডবেসে যোগ হয়।',
    flags: [
      { flag: 'php artisan breeze:install blade', description: 'সরাসরি Blade টেমপ্লেটের সাথে ইনস্টল', englishDescription: 'Install with Blade stack' },
      { flag: 'php artisan breeze:install api', description: 'শুধুমাত্র API ব্যাকএন্ড অথেন্টিকেশন', englishDescription: 'Install API-only mode' }
    ],
    tags: ['breeze', 'scaffold', 'auth', 'views'],
    isEssential: true,
    exampleOutput: '   INFO  Breeze scaffolding installed successfully.\n   WARN  Please run "npm install && npm run dev" to compile your assets.'
  },
  {
    id: 'breeze-assets',
    command: 'npm install && npm run dev',
    title: 'Compile Frontend Assets for Breeze',
    banglaTitle: 'ফ্রন্টএন্ড অ্যাসেট বিল্ড ও রান করা (Vite)',
    category: 'auth',
    englishExplanation: 'Installs npm dependencies and boots the Vite hot-module development server for Tailwind CSS and frontend scripting.',
    banglaExplanation: 'Breeze এর ডিজাইন ও জাভাস্ক্রিপ্ট ইন্টারঅ্যাক্টিভিটি কম্পাইল করার জন্য Node প্যাকেজগুলো ইন্সটল করে এবং Vite সার্ভার চালু করে।',
    tags: ['npm', 'vite', 'assets', 'frontend'],
    isEssential: true,
    exampleOutput: 'added 89 packages in 3s\n  VITE v5.x.x  ready in 240 ms\n  ➜  Local:   http://localhost:5173/'
  },

  // 8. Composer & Maintenance
  {
    id: 'dump-autoload',
    command: 'composer dump-autoload',
    title: 'Composer Dump Autoload',
    banglaTitle: '৮. কম্পোজার অটো-লোডার রিফ্রেশ করা',
    category: 'setup',
    englishExplanation: 'Re-generates the autoload classmap. Solves "Class not found" errors after creating manual classes, helpers, seeders, or database files.',
    banglaExplanation: 'ম্যানুয়ালি নতুন কোনো ক্লাস, কন্ট্রোলার, হেল্পার ফাইল বা সিডার যুক্ত করার পর যদি লারাভেল "Class not found" এরর দেয়, তবে কম্পোজারের অটো-লোড ম্যাপ রিফ্রেশ করতে এই কমান্ড দিতে হয়।',
    tags: ['composer', 'autoload', 'class not found', 'refresh'],
    isEssential: true,
    exampleOutput: 'Generating optimized autoload files\nGenerated optimized autoload files containing 4892 classes'
  },
  {
    id: 'maintenance-down',
    command: 'php artisan down --secret="my-bypass-secret"',
    title: 'Enable Maintenance Mode (503)',
    banglaTitle: 'অ্যাপ্লিকেশন মেইনটেনেন্স মোডে নেওয়া',
    category: 'hosting',
    englishExplanation: 'Puts application into maintenance mode for safe deployments. Developers can bypass the 503 screen using a secret cookie URL.',
    banglaExplanation: 'সার্ভারে কোড আপডেট বা মাইগ্রেশন রান করার সময় ইউজারদের জন্য সাইট বন্ধ রেখে 503 মেইনটেনেন্স পেজ প্রদর্শন করে। সিক্রেট টোকেন দিয়ে ডেভেলপাররা ব্রাউজারে বাইপাস করতে পারেন।',
    tags: ['maintenance', 'down', 'live', 'deploy'],
    exampleOutput: '   INFO  Application is now in maintenance mode.'
  },
  {
    id: 'maintenance-up',
    command: 'php artisan up',
    title: 'Bring Application Out of Maintenance Mode',
    banglaTitle: 'মেইনটেনেন্স মোড থেকে সাইট লাইভ করা',
    category: 'hosting',
    englishExplanation: 'Brings application back online after deploying code or running database migrations.',
    banglaExplanation: 'কাজ শেষ হওয়ার পর অ্যাপ্লিকেশনকে পুনরায় সবার জন্য উন্মুক্ত ও সচল করে দিতে এই কমান্ড দিতে হয়।',
    tags: ['up', 'maintenance', 'live'],
    exampleOutput: '   INFO  Application is now live.'
  }
];
