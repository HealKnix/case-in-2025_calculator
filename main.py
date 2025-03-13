def process_coordinates(filename):
    try:
        with open(filename, "r", encoding="utf-8") as f:
            data = f.read()
    except FileNotFoundError:
        print(f"Файл {filename} не найден.")
        return

    # Разбиваем текст по пробельным символам
    tokens = data.split()
    result = []

    for token in tokens:
        # Убираем возможные завершающие запятые
        token = token.strip(",")
        # Разбиваем координаты по запятой
        parts = token.split(",")
        if len(parts) < 2:
            continue  # если не хватает данных, пропускаем
        try:
            # Преобразуем x и y в числа
            x = float(parts[0])
            y = float(parts[1])
            # Добавляем список [y, x] (z отбрасываем)
            result.append([y, x])
        except ValueError:
            print(f"Не удалось преобразовать координаты: {token}")
            continue

    # Выводим результат в требуемом формате
    print(result)


if __name__ == "__main__":
    process_coordinates("input.txt")
