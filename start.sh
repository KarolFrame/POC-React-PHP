GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${GREEN}Starting PHP backend...${NC}"
cd backend || exit
php -S localhost:8000 &
PHP_PID=$!
echo -e "${GREEN}Backend running at http://localhost:8000 (PID: $PHP_PID)${NC}"

echo -e "${GREEN}Installing frontend dependencies if needed...${NC}"
cd ../frontend/fero || exit
if [ ! -d node_modules ]; then
  npm install
fi

echo -e "${GREEN}Creating .env.local if it does not exist...${NC}"
if [ ! -f .env.local ]; then
  echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
fi

echo -e "${GREEN}Starting React frontend...${NC}"
npm run dev

echo -e "${GREEN}Stopping PHP backend...${NC}"
kill $PHP_PID
