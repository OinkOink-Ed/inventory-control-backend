# Pet проект системы складского учета картриджей, был не завершен т.к захотелось создать более масштабируемый пет проект.

# Backend часть

# Установка зависимостей pnpm install

# У вас должно быть настроено окружение для работы Docker-контейнерами

# Как это делать я тут описывать не буду. на Linux должно быть из коробки, на WIN использую Docker Desktop и виртуальную машину для Linux

# Создайте в корне проекта .env файл примерно со следующим содержимым:

# ---------- MySQL (читается сервисом db) ----------

MYSQL_ROOT_PASSWORD=root_local_pass
MYSQL_DATABASE=inventory
MYSQL_USER=inventory
MYSQL_PASSWORD=inventory_local_pass

# ---------- Backend: подключение к БД ----------

# ВАЖНО: хост = имя сервиса в compose, т.е. "db", а не localhost

DB_HOST=db
DB_PORT=3306
DB_NAME=inventory
DB_USER=inventory
DB_PASSWORD=inventory_local_pass

# ---------- Backend: приложение ----------

NODE_ENV=development
PORT=3000

# JWT секреты (для тестов, минимум 32 символа)

JWT_ACCESS_SECRET=dev_access_secret_key_at_least_32_chars_long
JWT_REFRESH_SECRET=dev_refresh_secret_key_at_least_32_chars_long

# Порт приложения (должен совпадать с пробросом в compose)

APP_PORT=3000

# Хост MySQL (внутри docker-сети это имя сервиса "db")

MYSQL_USER_HOST=db

# Часовой пояс

TZ=UTC

# Для работы вотчера в Docker (обязательно для Windows/macOS)

CHOKIDAR_USEPOLLING=true

# Запуск окружения Docker

docker network create inventory-network

docker compose -f docker-compose.dev.yml up

# Далее запускаем seed для заполнения БД тестовыми данными сиды запускаются лишь один раз!

docker compose -f docker-compose.dev.yml exec backend pnpm run seed
