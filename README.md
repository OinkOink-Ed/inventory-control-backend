# Pet проект системы складского учета картриджей, был не завершен т.к захотелось создать более масштабируемый пет проект.

# Backend часть

# Установка зависимостей pnpm install

# У вас должно быть настроено окружение для работы Docker-контейнерами

# Как это делать я тут описывать не буду. на Linux должно быть из коробки, на WIN использую Docker Desktop и виртуальную машину для Linux

# Создайте в корне проекта .env файл примерно со следующим содержимым:

NODE_ENV=development
APP_PORT=3000

DB_HOST=db
DB_PORT=3306
DB_USER=inventory
DB_PASSWORD=inventory_local_pass
DB_NAME=inventory

MYSQL_ROOT_PASSWORD=root_local_pass
MYSQL_DATABASE=inventory
MYSQL_USER=inventory
MYSQL_PASSWORD=inventory_local_pass

JWT_ACCESS_SECRET=dev_access_secret_key_at_least_32_chars_long
JWT_REFRESH_SECRET=dev_refresh_secret_key_at_least_32_chars_long

TZ=UTC
CHOKIDAR_USEPOLLING=true

# Запуск окружения Docker

docker network create inventory-network

docker compose -f docker-compose.dev.yml up

# Далее запускаем seed для заполнения БД тестовыми данными сиды запускаются лишь один раз!

docker compose -f docker-compose.dev.yml exec backend pnpm run seed
