export const AI_EXCLUSION_MEGA_REGEX = new RegExp([
            // Match with or without preceding slash
            '(^|/)package-lock\\.json$',
            '(^|/)yarn\\.lock$',
            '(^|/)pnpm-lock\\.yaml$',
            '(^|/)bun\\.lockb$',
            '(^|/)Gemfile\\.lock$',
            '(^|/)Pipfile\\.lock$',
            '(^|/)poetry\\.lock$',
            '(^|/)composer\\.lock$',
            '(^|/)Cargo\\.lock$',
            '(^|/)go\\.sum$',
            '(^|/)pubspec\\.lock$',

            // ==================== BUILD DIRECTORIES ====================
            '/(dist|build|out|target|bin|obj|\\.next|\\.nuxt|\\.output|\\.vercel|\\.netlify|__pycache__|\\.pytest_cache|\\.cache|node_modules|vendor|bower_components|\\.gradle|venv|\\.venv|env|\\.env)/',

            // ==================== VERSION CONTROL ====================
            '/(\\.git|\\.svn|\\.hg)/',
            '(^|/)(\\.(git|docker|npm)ignore|\\.gitattributes|\\.gitmodules)$',

            // ==================== IDE/EDITOR ====================
            '/(\\.vscode|\\.idea|\\.vs)/',
            '(^|/)(\\.(DS_Store|editorconfig)|Thumbs\\.db)$',
            '\\.(swp|swo|sublime-(project|workspace))$',

            // ==================== LOGS/TEMP ====================
            '/(logs?|tmp|temp|coverage|\\.nyc_output)/',
            '\\.(log|tmp|temp|pid|seed|pid\\.lock)$',

            // ==================== MINIFIED/BUNDLED ====================
            '\\.(min\\.(js|css)|bundle\\.js|chunk\\.js|vendor\\.js|polyfills\\.js|.*\\.map)$',

            // ==================== BINARY FILES ====================
            // Images
            '\\.(png|jpe?g|gif|bmp|ico|svg|webp|tiff?|psd|ai|eps|raw|heic|heif|cr2|nef|dng)$',
            // Videos
            '\\.(mp4|avi|mov|mkv|flv|wmv|webm|m4v|mpe?g|3gp|ogv|m2ts|mts)$',
            // Audio
            '\\.(mp3|wav|flac|aac|ogg|wma|m4a|opus|aiff|ape|alac|mid|midi|amr)$',
            // Documents
            '\\.(pdf|docx?|xlsx?|pptx?|odt|ods|odp|pages|numbers|keynote)$',
            // Archives
            '\\.(zip|tar|gz|rar|7z|bz2|xz|tgz|tar\\.gz|zipx|cab|iso|dmg|img)$',
            // Executables
            '\\.(exe|dll|so|dylib|app|deb|rpm|apk|msi)$',
            // Fonts
            '\\.(woff2?|ttf|otf|eot)$',
            // Databases
            '\\.(db|sqlite3?|mdb|accdb)$',

            // ==================== ML MODELS ====================
            '\\.(h5|pkl|pickle|pth|pt|onnx|pb|tflite|safetensors|model|weights)$',
            '/(checkpoints?|models)/',

            // ==================== DATA FILES ====================
            '\\.(parquet|feather|arrow|hdf5|npy|npz)$',
            '/(data|datasets)/',

            // ==================== TEST/COVERAGE ====================
            '/(coverage|test-results?|htmlcov|\\.nyc_output|storybook-static)/',
            '\\.(lcov|coverage)$',
            '(^|/)(junit\\.xml|test-report\\.xml)$',

            // ==================== GENERATED DOCS ====================
            '/(docs/build|site|_site|public/docs|typedoc|jsdoc|api-docs)/',

            // ==================== MOBILE ====================
            '/(Pods|DerivedData|android/app/build|ios/build|gradle)/',
            '\\.(apk|aab|xcodeproj|xcworkspace)$',
            '(^|/)(Podfile\\.lock|gradlew|gradlew\\.bat|local\\.properties|proguard-rules\\.pro)$',

            // ==================== CLOUD ====================
            '/(\\.terraform|\\.serverless|cdk\\.out|\\.pulumi|amplify)/',
            '\\.(tfstate|tfstate\\.backup)$',
            '(^|/)firebase-debug\\.log$',

            // ==================== LESS IMPORTANT CONFIG (OPTIONAL) ====================
            '(^|/)(\\.(prettierrc.*|prettierignore|eslintrc.*|eslintignore)|tsconfig\\.tsbuildinfo|.*-env\\.d\\.ts|browserslist|\\.babelrc|(babel|jest|vitest|playwright|cypress)\\.config\\.(js|ts|json))$',

            // ==================== BACKUPS ====================
            '\\.(bak|backup|old|orig|~|class)$',

            // ==================== PYTHON ====================
            '/__pycache__/',
            '\\.py[cod]$',
            '\\.Python$',
            '/(\\.pytest_cache|\\.tox|\\.coverage|htmlcov)/',

            // ==================== 3D/GAME ====================
            '\\.(obj|fbx|blend|max|c4d|stl|dae|gltf|glb|unity3d|unitypackage|asset|prefab|pak)$',

            // ==================== VM FILES ====================
            '\\.(vdi|vmdk|vhd|ova|ovf)$'
        ].join('|'), 'i');