import { CodeTemplate } from '../types';

export const CODE_TEMPLATES: CodeTemplate[] = [
  {
    id: 'routes-web',
    filename: 'routes/web.php',
    category: 'routes',
    title: 'Web Routes & Relationship Queries (web.php)',
    banglaTitle: 'routes/web.php (রাউট এবং মডেল রিলেশনশিপ কোডিং)',
    englishExplanation: 'The primary entry point for handling browser HTTP requests in Laravel. Below is a complete real-world setup demonstrating basic routes, controllers, and Eloquent relationship queries (eager loading with `with()`, inverse relations, and `whereHas()` relationship filters).',
    banglaExplanation: 'ব্রাউজারে রিকোয়েস্ট হ্যান্ডেল করার মূল রাউট ফাইল। নিচে বেসিক রাউট থেকে শুরু করে মডেল রিলেশনশিপ (with eager loading, has, whereHas) কোয়েরি করার পূর্ণাঙ্গ কোড প্রতিটি লাইনে বিস্তারিত বাংলা কমেন্ট সহ দেওয়া হলো:',
    language: 'php',
    englishTips: [
      'Always eager load relationships using with("category") to avoid the N+1 query problem in loops.',
      'Use whereHas("category", fn($q) => $q->where("is_active", true)) to filter models based on relation existence.'
    ],
    tips: [
      'N+1 প্রবলেম এড়াতে রিলেশনশিপ ডাটা নিয়ে আসার সময় সর্বদা with("category") বা Eager Loading ব্যবহার করুন।',
      '->whereHas("category", fn($q) => $q->where("status", "active")) দিয়ে রিলেশনশিপের ভেতরের ফিল্টার কুয়েরি করা যায়।'
    ],
    code: `<?php

use Illuminate\\Support\\Facades\\Route;
use App\\Models\\Product;
use App\\Models\\Category;
use App\\Models\\User;
use App\\Http\\Controllers\\ProductController;
use App\\Http\\Controllers\\HomeController;

/*
|--------------------------------------------------------------------------
| 1. Basic Web Routes
|--------------------------------------------------------------------------
*/

// Home page route
Route::get('/', function () {
    return view('welcome');
})->name('home');

/*
|--------------------------------------------------------------------------
| 2. Relationship Queries in Routes (Eager Loading & Filters)
|--------------------------------------------------------------------------
*/

// (A) Eager Loading: Load products along with their category and tags
Route::get('/shop/products', function () {
    // Eager loading eliminates N+1 query overhead
    $products = Product::with(['category', 'tags']) // Load relationships
        ->where('is_active', true)                    // Only active products
        ->latest()                                    // Order by created_at DESC
        ->paginate(12);                               // 12 items per page

    return view('shop.index', compact('products'));
})->name('shop.products');

// (B) Relationship Filter: Find categories that have products with price > 500
Route::get('/categories-with-products', function () {
    $categories = Category::whereHas('products', function ($query) {
        $query->where('price', '>', 500); // Filter condition on relationship
    })->withCount('products')->get();    // Includes products_count aggregate

    return view('categories.active', compact('categories'));
});

// (C) Inverse Relationship: Access products from a parent Category model
Route::get('/categories/{category:slug}', function (Category $category) {
    // Accessing child products via relation method
    $products = $category->products()->latest()->paginate(9);

    return view('categories.show', [
        'category' => $category,
        'products' => $products,
    ]);
})->name('categories.show');

/*
|--------------------------------------------------------------------------
| 3. Resource Route (CRUD Actions in 1 Line)
|--------------------------------------------------------------------------
| Scaffolds index, create, store, show, edit, update, destroy
*/
Route::resource('products', ProductController::class);

/*
|--------------------------------------------------------------------------
| 4. Middleware-Protected Routes (Authenticated Users)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth'])->group(function () {
    // User dashboard
    Route::get('/dashboard', [HomeController::class, 'dashboard'])->name('dashboard');

    // Access user relationships: auth()->user()->orders
    Route::get('/my-orders', function () {
        $orders = auth()->user()->orders()->with('items.product')->latest()->get();
        return view('orders.index', compact('orders'));
    })->name('my.orders');
});
`
  },
  {
    id: 'models-eloquent-relations',
    filename: 'app/Models/Product.php',
    category: 'models',
    title: 'Eloquent Model Relationships (Complete Guide)',
    banglaTitle: 'app/Models/Product.php (মডেল রিলেশনশিপ যুক্ত করার নিয়ম)',
    englishExplanation: 'Complete Eloquent Model with belongsTo, hasMany, belongsToMany, and hasOne relationship definitions. Illustrated with mass-assignment fillable protection, attribute casting, and soft deletes.',
    banglaExplanation: 'লারাভেল মডেলে কীভাবে belongsTo, hasMany, belongsToMany এবং hasOne রিলেশন তৈরি করতে হয় তার পূর্ণাঙ্গ উদাহরণ। প্রতিটি রিলেশনের পাশে বিস্তারিত বাংলা ব্যাখ্যা দেওয়া হয়েছে:',
    language: 'php',
    englishTips: [
      'Laravel follows foreign key convention: table_name_id (e.g. category_id).',
      'belongsToMany requires a linking pivot table (e.g. product_tag) with both foreign keys.'
    ],
    tips: [
      'Foreign Key এর স্ট্যান্ডার্ড নাম: টেবিলনাম_id (যেমন: category_id)। লারাভেল স্বয়ংক্রিয়ভাবে এটি ডিটেক্ট করে।',
      'belongsToMany ব্যবহারের সময় ডাটাবেজে একটি পিভট টেবিল থাকতে হয় (যেমন: category_product বা product_tag)।'
    ],
    code: `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;
use Illuminate\\Database\\Eloquent\\SoftDeletes;

// Import relationship return types
use Illuminate\\Database\\Eloquent\\Relations\\BelongsTo;
use Illuminate\\Database\\Eloquent\\Relations\\HasMany;
use Illuminate\\Database\\Eloquent\\Relations\\BelongsToMany;
use Illuminate\\Database\\Eloquent\\Relations\\HasOne;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    // Database table name
    protected $table = 'products';

    // Mass assignment protection
    protected $fillable = [
        'category_id', // Foreign key referencing categories.id
        'name',
        'slug',
        'price',
        'stock',
        'is_active',
    ];

    // Attribute type casting
    protected $casts = [
        'price' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationship 1: BelongsTo (Parent Category)
    |--------------------------------------------------------------------------
    | Usage: $product->category->name
    */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    /*
    |--------------------------------------------------------------------------
    | Relationship 2: HasMany (Customer Reviews)
    |--------------------------------------------------------------------------
    | Usage: $product->reviews (Collection of reviews)
    */
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class, 'product_id', 'id');
    }

    /*
    |--------------------------------------------------------------------------
    | Relationship 3: BelongsToMany (Many-to-Many Tags)
    |--------------------------------------------------------------------------
    | Usage: $product->tags (Requires pivot table 'product_tag')
    */
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'product_tag')
                    ->withTimestamps(); // Tracks created_at on pivot table
    }

    /*
    |--------------------------------------------------------------------------
    | Relationship 4: HasOne (One-to-One Inventory Record)
    |--------------------------------------------------------------------------
    | Usage: $product->inventory->sku
    */
    public function inventory(): HasOne
    {
        return $this->hasOne(Inventory::class);
    }
}
`
  },
  {
    id: 'models-category-inverse',
    filename: 'app/Models/Category.php',
    category: 'models',
    title: 'Inverse Relationship (Category Model)',
    banglaTitle: 'app/Models/Category.php (বিপরীত রিলেশন HasMany)',
    englishExplanation: 'Inverse parent model showing how Category accesses its child products using hasMany relationship.',
    banglaExplanation: 'ক্যাটাগরি মডেল থেকে প্রোডাক্টগুলো অ্যাক্সেস করার কোড। এটি ১টি ক্যাটাগরির আন্ডারে অনেকগুলো প্রোডাক্ট থাকার লজিক হ্যান্ডেল করে:',
    language: 'php',
    englishTips: [
      '$category->products returns a collection; $category->products() returns a query builder.',
      'Use $category->products()->count() to count items efficiently in the database.'
    ],
    tips: [
      '$category->products()->where("price", ">", 100)->get() দিলে নির্দিষ্ট শর্তে প্রোডাক্ট ফিল্টার হয়।',
      '$category->products()->count() দিয়ে সরাসরি ডাটাবেজে প্রোডাক্ট সংখ্যা গোনা যায়।'
    ],
    code: `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;
use Illuminate\\Database\\Eloquent\\Relations\\HasMany;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug', 'description'];

    /*
    |--------------------------------------------------------------------------
    | HasMany Relationship: One Category has many Products
    |--------------------------------------------------------------------------
    | Usage: $category->products
    */
    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'category_id', 'id');
    }
}
`
  },
  {
    id: 'routes-api',
    filename: 'routes/api.php',
    category: 'routes',
    title: 'RESTful API Routes (Sanctum Auth)',
    banglaTitle: 'routes/api.php (রেস্টফুল API রাউট)',
    englishExplanation: 'Stateless API routing setup for mobile apps (Flutter, React Native) and Single Page Applications (Next.js, Vue). Includes public authentication endpoints and Sanctum token-guarded routes.',
    banglaExplanation: 'মোবাইল অ্যাপ বা ফ্রন্টএন্ড অ্যাপ্লিকেশনের জন্য Sanctum টোকেন অথেন্টিকেটেড রেস্টফুল API এন্ডপয়েন্ট কনফিগারেশন:',
    language: 'php',
    englishTips: [
      'Laravel automatically prefixes routes in this file with /api (e.g. /api/products).',
      'API routes are stateless and use Bearer tokens instead of CSRF cookies.'
    ],
    tips: [
      'লারাভেলে সব api রাউটের পূর্বে স্বয়ংক্রিয়ভাবে /api প্রিফিক্স যোগ হয় (যেমন: https://example.com/api/products)।',
      'API রাউট স্টেটলেস (Stateless) এবং সেশন ব্যবহার না করে Sanctum বা Bearer টোকেন ব্যবহার করে।'
    ],
    code: `<?php

use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\Route;
use App\\Http\\Controllers\\Api\\AuthController;
use App\\Http\\Controllers\\Api\\ProductApiController;

/*
|--------------------------------------------------------------------------
| 1. Public Authentication Endpoints
|--------------------------------------------------------------------------
*/
// Register new user (returns user info and Sanctum plain-text token)
Route::post('/register', [AuthController::class, 'register']);

// User login (returns API token for future requests)
Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| 2. Public Data Endpoints (No Token Required)
|--------------------------------------------------------------------------
*/
// List all products with relations
Route::get('/products', [ProductApiController::class, 'index']);

// Show single product details
Route::get('/products/{id}', [ProductApiController::class, 'show']);

/*
|--------------------------------------------------------------------------
| 3. Protected API Routes (Requires Authorization: Bearer <TOKEN>)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    // Current authenticated user profile
    Route::get('/user', function (Request $request) {
        return response()->json([
            'status' => 'success',
            'user' => $request->user(),
        ]);
    });

    // Create new product
    Route::post('/products', [ProductApiController::class, 'store']);

    // Update existing product
    Route::put('/products/{id}', [ProductApiController::class, 'update']);

    // Delete product
    Route::delete('/products/{id}', [ProductApiController::class, 'destroy']);

    // Logout and revoke token
    Route::post('/logout', [AuthController::class, 'logout']);
});
`
  },
  {
    id: 'migrations-schema',
    filename: 'database/migrations/xxxx_create_products_table.php',
    category: 'migrations',
    title: 'Database Migration Schema with Foreign Keys',
    banglaTitle: 'database/migrations/..._create_products_table.php (মাইগ্রেশন)',
    englishExplanation: 'Database schema migration blueprint featuring foreign key constraints with cascadeOnDelete(), unique slug indexes, timestamps, and softDeletes().',
    banglaExplanation: 'ফরেন কি কনস্ট্রেইন্ট (Foreign Key Constraint), ক্যাস্কেড ডিলিট, ইনডেক্সিং এবং কলাম টাইপ তৈরির সম্পূর্ণ বাস্তব উদাহরণ:',
    language: 'php',
    englishTips: [
      'foreignId("category_id")->constrained()->cascadeOnDelete() cleans up orphan rows automatically.',
      'The down() method specifies the rollback operation when running migrate:rollback.'
    ],
    tips: [
      'foreignId("category_id")->constrained()->cascadeOnDelete() দিলে পেরেন্ট ক্যাটাগরি ডিলিট হলে চাইল্ড প্রোডাক্টও স্বয়ংক্রিয়ভাবে ডাটাবেজ থেকে মুছে যায়।',
      'down() মেথডে Schema::dropIfExists() থাকে যা রোলব্যাকের সময় কার্যকর হয়।'
    ],
    code: `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id(); // Auto-incrementing primary key (bigint)
            
            // Foreign Key relationship to categories.id with cascade on delete
            $table->foreignId('category_id')->constrained('categories')->cascadeOnDelete();
            
            $table->string('name', 255);
            $table->string('slug')->unique(); // Unique slug for SEO URLs
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->integer('stock')->default(0);
            $table->boolean('is_active')->default(true);
            
            // Compound index for high-performance query filtering
            $table->index(['name', 'is_active']);
            
            $table->timestamps();  // created_at & updated_at
            $table->softDeletes(); // deleted_at column for soft deletes
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
`
  },
  {
    id: 'controllers-resource',
    filename: 'app/Http/Controllers/ProductController.php',
    category: 'controllers',
    title: 'Resource Controller Implementation with Relations',
    banglaTitle: 'app/Http/Controllers/ProductController.php (রিসোর্স কন্ট্রোলার)',
    englishExplanation: 'Standard CRUD Resource Controller with pagination, eager loading with("category"), input validation, slug generation, and flash messages.',
    banglaExplanation: 'সার্চ, রিলেশনশিপ ইগার লোডিং (with category), ডাটা ভ্যালিডেশন, ফাইল আপলোড এবং ফ্ল্যাশ মেসেজ সহ সম্পূর্ণ CRUD কন্ট্রোলার:',
    language: 'php',
    englishTips: [
      'Use Product::with("category")->paginate(10) to fetch products and category in a single query.',
      'redirect()->route(...)->with("success", "...") sets flash session data.'
    ],
    tips: [
      'Product::with("category")->paginate(10) ব্যবহার করলে একটি মাত্র SQL কুয়েরিতে সমস্ত প্রোডাক্ট ও তার ক্যাটাগরি চলে আসে।',
      '$request->validate([...]) ইনপুট যাচাই করে এবং এরর থাকলে স্বয়ংক্রিয়ভাবে আগের পেজে রিডাইরেক্ট করে।'
    ],
    code: `<?php

namespace App\\Http\\Controllers;

use App\\Models\\Product;
use App\\Models\\Category;
use Illuminate\\Http\\Request;
use Illuminate\\Support\\Str;

class ProductController extends Controller
{
    /**
     * Display a listing of products with relations and search filter.
     */
    public function index(Request $request)
    {
        // 1. Eager load category to prevent N+1 queries
        $query = Product::with('category')->latest();

        // 2. Filter by search query if present
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // 3. Paginate results
        $products = $query->paginate(10);

        return view('products.index', compact('products'));
    }

    /**
     * Show form for creating a new product.
     */
    public function create()
    {
        $categories = Category::all();
        return view('products.create', compact('categories'));
    }

    /**
     * Store a newly created product in database.
     */
    public function store(Request $request)
    {
        // 1. Validate request inputs
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'description' => 'nullable|string',
        ]);

        // 2. Generate slug
        $validated['slug'] = Str::slug($validated['name']) . '-' . rand(100, 999);

        // 3. Create product
        Product::create($validated);

        // 4. Redirect with flash message
        return redirect()->route('products.index')
            ->with('success', 'Product created successfully!');
    }

    /**
     * Display the specified product with relations.
     */
    public function show(Product $product)
    {
        $product->load(['category', 'reviews']);
        return view('products.show', compact('product'));
    }

    /**
     * Update the specified product in database.
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ]);

        $product->update($validated);

        return redirect()->route('products.index')
            ->with('success', 'Product updated successfully!');
    }

    /**
     * Remove the specified product.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('products.index')
            ->with('success', 'Product deleted successfully!');
    }
}
`
  },
  {
    id: 'bootstrap-app',
    filename: 'bootstrap/app.php',
    category: 'bootstrap',
    title: 'Laravel 11 Application Bootstrap File',
    banglaTitle: 'bootstrap/app.php (লারাভেল অ্যাপ ইনিশিয়ালাইজেশন)',
    englishExplanation: 'The centralized configuration file in Laravel 11 replacing the legacy Kernel.php. Manages route registration, middleware alias definitions, CSRF exemptions, and exception handlers.',
    banglaExplanation: 'লারাভেল ১১-এর কেন্দ্রীয় কনফিগারেশন ফাইল। পুরোনো Kernel.php এর বদলে এখানেই সমস্ত রাউটিং পাথ, মিডলওয়্যার অ্যালিয়াস এবং এরর এক্সসেপশন হ্যান্ডেলিং কনফিগার করা হয়:',
    language: 'php',
    englishTips: [
      'Register middleware aliases with $middleware->alias([...]) to reference them cleanly in routes.',
      'API routing is enabled by specifying api: __DIR__."/../routes/api.php" in withRouting().'
    ],
    tips: [
      'কাস্টম মিডলওয়্যার শর্টকাট নাম তৈরি করতে $middleware->alias([...]) ব্যবহার করুন।',
      'API রাউট ফাইল যুক্ত করতে withRouting(..., api: __DIR__."/../routes/api.php") লিখলেই যথেষ্ট।'
    ],
    code: `<?php

use Illuminate\\Foundation\\Application;
use Illuminate\\Foundation\\Configuration\\Exceptions;
use Illuminate\\Foundation\\Configuration\\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    // 1. Routing setup
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',          // Web routes
        api: __DIR__ . '/../routes/api.php',          // API routes
        commands: __DIR__ . '/../routes/console.php', // Artisan commands
        health: '/up',                               // Health check
    )
    // 2. Middleware configuration
    ->withMiddleware(function (Middleware $middleware) {
        // Register custom middleware aliases
        $middleware->alias([
            'admin' => \\App\\Http\\Middleware\\CheckAdmin::class,
            'check.age' => \\App\\Http\\Middleware\\CheckAge::class,
        ]);

        // Exclude specific routes from CSRF verification (e.g. Stripe webhooks)
        $middleware->validateCsrfTokens(except: [
            'stripe/*',
            'api/payment-webhook',
        ]);
    })
    // 3. Exception handling
    ->withExceptions(function (Exceptions $exceptions) {
        // Custom production error logging or rendering
    })->create();
`
  },
  {
    id: 'env-database-email',
    filename: '.env',
    category: 'env',
    title: 'MySQL & Email Server Configuration (.env)',
    banglaTitle: '.env ফাইল (MySQL ও ইমেইল সার্ভার কনফিগারেশন)',
    englishExplanation: 'Environment configuration file containing database credentials, mail server settings, and application secrets. Keep this file out of source control (.gitignore).',
    banglaExplanation: 'ডাটাবেজ ও মেইল সার্ভারের গোপন ক্রেডেনশিয়াল সুরক্ষিত রাখার ফাইল। প্রতিটি লাইনের কাজের বিবরণ নিচে কমেন্ট আকারে দেওয়া হলো:',
    language: 'ini',
    englishTips: [
      'Never commit your .env file to public GitHub repositories.',
      'Use Mailtrap.io for safe local email testing without sending real emails to users.'
    ],
    tips: [
      'প্রোডাকশন সার্ভারে কখনোই APP_DEBUG=true রাখবেন না, এটি সিকিউরিটির জন্য ঝুঁকিপূর্ণ।',
      'লোকাল পরীক্ষার জন্য Mailtrap.io সবচেয়ে সহজ ও নিরাপদ ইমেইল টেস্টিং টুল।'
    ],
    code: `# ========================================================
# 1. Application Settings
# ========================================================
APP_NAME="LaravelApp"
APP_ENV=local           # 'local' in development, 'production' on live server
APP_KEY=base64:your_app_key_here # Generated by php artisan key:generate
APP_DEBUG=true          # Always set to false in production
APP_URL=http://localhost:8000

# ========================================================
# 2. MySQL Database Connection Settings
# ========================================================
DB_CONNECTION=mysql     # mysql / pgsql / sqlite
DB_HOST=127.0.0.1       # Localhost IP
DB_PORT=3306            # Default MySQL port
DB_DATABASE=laravel_db  # Your database name
DB_USERNAME=root        # Database username
DB_PASSWORD=            # Database password (empty in default XAMPP/Laragon)

# ========================================================
# 3. Email Server Setup (Mailtrap - Local Testing)
# ========================================================
MAIL_MAILER=smtp
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_mailtrap_username
MAIL_PASSWORD=your_mailtrap_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="no-reply@mywebsite.com"
MAIL_FROM_NAME="\${APP_NAME}"

# ========================================================
# 4. Gmail SMTP Alternative (Production / Live)
# ========================================================
# MAIL_MAILER=smtp
# MAIL_HOST=smtp.gmail.com
# MAIL_PORT=587
# MAIL_USERNAME=your_email@gmail.com
# MAIL_PASSWORD=your_16_digit_google_app_password
# MAIL_ENCRYPTION=tls
# MAIL_FROM_ADDRESS="your_email@gmail.com"
# MAIL_FROM_NAME="\${APP_NAME}"
`
  }
];
