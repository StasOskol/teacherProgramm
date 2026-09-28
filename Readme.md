# 🎮 RunAndSurvive — Настройка проекта Unreal Engine 5.7

## 🎯 Меню

1. [Создать проект на Unreal Engine 5.7 с персонажем, управляемым с клавиатуры и мыши](#Создать-проект-на-Unreal-Engine-5.7-с-персонажем,-управляемым-с-клавиатуры-и-мыши)
2. [Настройка прыжка персонажа по нажатию клавиши](#Настройка-прыжка-персонажа-по-нажатию-клавиши)
3. [Вопросы](#Вопросы)

---

# Создать проект на Unreal Engine 5.7 с персонажем, управляемым с клавиатуры и мыши
## 🔹 ЭТАП 1: УСТАНОВКА РАСШИРЕНИЙ VS CODE (ДЕЛАЕТСЯ ОДИН РАЗ)

1. Открой **VS Code**.
2. Нажми `Ctrl+Shift+X` (панель расширений).
3. Установи **три** расширения:
   - `C/C++ Extension Pack`
   - `C# Dev Kit`
   - `UE5 Development Tools`
4. Перезапусти VS Code.

---

## 🔹 ЭТАП 2: СОЗДАНИЕ ПРОЕКТА

1. Открой **Epic Games Launcher** → запусти **Unreal Engine 5.7**.
2. В окне **Project Browser**:
   - Выбери **Игры (Games)** → **Пустой (Blank)**.
   - **Обязательно** выбери **C++** (не Blueprint!).
   - Назови проект: `RunAndSurvive`.
   - Укажи папку: `/---своя папка---/`
   - Нажми **"Создать"**.
3. **Важно:** Не открывай VS Code вручную. Проект создастся сам.

---

## 🔹 ЭТАП 3: ПЕРВЫЙ ЗАПУСК ПРОЕКТА (ПРОВЕРКА)

1. Найди файл `RunAndSurvive.uproject` в папке:
/---своя папка ---/ \RunAndSurvive\

2. **Дважды кликни** по нему.
3. Unreal Editor должен открыться без ошибок.
4. **Закрой** Unreal Editor.

---

## 🔹 ЭТАП 4: СОЗДАНИЕ C++ КЛАССА ПЕРСОНАЖА

1. В Unreal Editor: **Инструменты → Программирование → Новый класс C++...**.
2. Выбери родительский класс **Character**.
3. Назови класс: `MyHero`.
4. Нажми **"Создать"**.
5. **Важно:** VS Code откроется автоматически. Не закрывай его, пока не напишешь код.

---

## 🔹 ЭТАП 5: НАПИСАНИЕ КОДА (СКОПИРУЙ И ВСТАВЬ)

### В файле `MyHero.h`

Найди строку `GENERATED_BODY()` и **после неё** добавь:

```cpp
public:
 void MoveForward(float Value);
 void MoveRight(float Value);
```

 В файле `MyHero.cpp`
 1. Найди функцию SetupPlayerInputComponent и замени её на:
```cpp
void AMyHero::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
{
    Super::SetupPlayerInputComponent(PlayerInputComponent);

    PlayerInputComponent->BindAxis("MoveForward", this, &AMyHero::MoveForward);
    PlayerInputComponent->BindAxis("MoveRight", this, &AMyHero::MoveRight);
    PlayerInputComponent->BindAxis("Turn", this, &AMyHero::AddControllerYawInput);
    PlayerInputComponent->BindAxis("LookUp", this, &AMyHero::AddControllerPitchInput);

    // Для прыжка (добавь эти две строки, если хочешь)
    PlayerInputComponent->BindAction("Jump", IE_Pressed, this, &AMyHero::Jump);
    PlayerInputComponent->BindAction("Jump", IE_Released, this, &AMyHero::StopJumping);
}
```

В самый конец файла (после последней }) добавь:
```cpp
void AMyHero::MoveForward(float Value)
{
    if (Controller && Value != 0.0f)
    {
        FRotator YawRotation(0, Controller->GetControlRotation().Yaw, 0);
        FVector Direction = FRotationMatrix(YawRotation).GetUnitAxis(EAxis::X);
        AddMovementInput(Direction, Value);
    }
}

void AMyHero::MoveRight(float Value)
{
    if (Controller && Value != 0.0f)
    {
        FRotator YawRotation(0, Controller->GetControlRotation().Yaw, 0);
        FVector Direction = FRotationMatrix(YawRotation).GetUnitAxis(EAxis::Y);
        AddMovementInput(Direction, Value);
    }
}
```

3. Сохрани файлы (Ctrl+S).

4. Закрой VS Code.

🔹 ЭТАП 7: КОМПИЛЯЦИЯ (САМЫЙ ВАЖНЫЙ ШАГ)
1. Закрой Unreal Editor.

2. Найди файл RunAndSurvive.uproject.

3. Дважды кликни по нему.

4. Если появится окно "The following modules are missing..." — нажми "Да".

5. Дождись компиляции (внизу будет прогресс-бар).

6. Unreal Editor откроется.

7. Проверь: В Контент браузере → Классы C++ → RunAndSurvive должен появиться MyHero.

8. !!!ВАЖНО!!! Если там нет файла после перезапуска Unreal Engine, то нужно зайти в папку где лежит ваш проект и удалить папки:
    * Binaries/

    * Intermediate/

    * Saved/

И пересобрать проект, проверить ещё раз, есть ли в Контент браузере → Классы C++ -> MyHero. Если нет, значит может быть ошибка в коде.

## 🔹 ЭТАП 6: НАСТРОЙКА ВВОДА (КЛАВИШИ)

1. Открой проект через `.uproject`.
2. В Unreal Editor: **Правка → Настройки проекта → Движок → Ввод**.
3. В разделе **"Назначения осей" (Axis Mappings)** нажми **"Добавить"** для каждой строки:

| Имя оси | Клавиша | Масштаб (Scale) |
|---------|---------|-----------------|
| MoveForward | W | 1.0 |
| MoveForward | S | -1.0 |
| MoveRight | D | 1.0 |
| MoveRight | A | -1.0 |
| Turn | Mouse X | 1.0 |
| LookUp | Mouse Y | -1.0 |

4. В разделе **"Назначения действий" (Action Mappings)** нажми **"Добавить"**:

| Имя действия | Клавиша |
|--------------|---------|
| Jump | Space Bar |

5. Закрой настройки.

---   

## 🔹 ЭТАП 7: СОЗДАНИЕ BLUEPRINT ПЕРСОНАЖА
1. В Контент браузере открой папку "Классы C++" → "RunAndSurvive".

2. Найди MyHero → нажми правой кнопкой → "Создать Blueprint класс на основе MyHero".

3. Назови: BP_MyHero.

## 🔹 ЭТАП 8: НАСТРОЙКА КАМЕРЫ В BLUEPRINT
1. Дважды кликни по BP_MyHero.

2. В левой панели "Компоненты" нажми "Добавить компонент" → добавь SpringArmComponent.

3. Снова "Добавить компонент" → добавь CameraComponent.

4. В "Подробностях" для SpringArm:

    * Длина → 400

    * Use Pawn Control Rotation → ✅ (галочка)

5. В "Подробностях" для Camera:

    * Use Pawn Control Rotation → ❌ (сними галочку)

6. Нажми "Скомпилировать" → "Сохранить".

## 🔹 ЭТАП 9: СОЗДАНИЕ GAMEMODE

1. В Контент браузере нажми правой кнопкой → "Создать Blueprint класс".

2. Выбери GameModeBase → назови BP_GameMode.

3. Дважды кликни по BP_GameMode.

4. В "Подробностях" найди "Default Pawn Class" → выбери BP_MyHero.

5. Нажми "Скомпилировать" → "Сохранить".

## 🔹 ЭТАП 10: НАЗНАЧЕНИЕ GAMEMODE
1. Правка → Настройки проекта → Карты и режимы.

2. В поле "Режим игры по умолчанию" выбери BP_GameMode.

## 🔹 ЭТАП 11: ДОБАВЛЕНИЕ ТОЧКИ СТАРТА
1. На сцене (в 3D-виде) посмотри, есть ли PlayerStart.

2. Если нет — найди в Контент браузере → "Движок" → "Базовые" → PlayerStart.

3. Перетащи его на сцену.

4. Поставь координаты Z = 100 (над землёй).

## 🔹 ЭТАП 12: ТЕСТ
1. Нажми "Играть" (зелёный треугольник).

2. Проверь:

    * WASD — движение.

    * Мышь — поворот камеры.

    * Пробел — прыжок.

# Настройка прыжка персонажа по нажатию клавиши.

---

## 🔹 ЭТАП 1: НАСТРОЙКА ВВОДА

1. Открой **Unreal Editor**.
2. Перейди: **Правка → Настройки проекта → Движок → Ввод**.
3. В разделе **"Назначения действий" (Action Mappings)** нажми **"Добавить"**.
4. Заполни:
   - **Имя действия:** `Jump`
   - **Клавиша:** `Space Bar` (Пробел)
   - **Модификаторы:** оставь пустыми
5. Закрой настройки.

> ⚠️ Имя `Jump` должно быть написано **точно** так — с большой буквы, без пробелов.

---

## 🔹 ЭТАП 2: НАПИСАНИЕ КОДА

### Файл `MyHero.cpp` — функция `SetupPlayerInputComponent`

Найди эту функцию и добавь **две строки** для прыжка:

```cpp
void AMyHero::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
{
    Super::SetupPlayerInputComponent(PlayerInputComponent);

    // Движение
    PlayerInputComponent->BindAxis("MoveForward", this, &AMyHero::MoveForward);
    PlayerInputComponent->BindAxis("MoveRight", this, &AMyHero::MoveRight);
    PlayerInputComponent->BindAxis("Turn", this, &AMyHero::AddControllerYawInput);
    PlayerInputComponent->BindAxis("LookUp", this, &AMyHero::AddControllerPitchInput);

    // 👇 ЭТИ ДВЕ СТРОКИ ОТВЕЧАЮТ ЗА ПРЫЖОК
    PlayerInputComponent->BindAction("Jump", IE_Pressed, this, &AMyHero::Jump);
    PlayerInputComponent->BindAction("Jump", IE_Released, this, &AMyHero::StopJumping);
}
```

**Что делают эти строки:**

| Строка | Когда срабатывает | Что вызывает |
|--------|-------------------|--------------|
| `BindAction("Jump", IE_Pressed, ...)` | При **нажатии** Пробела | `Jump()` — персонаж прыгает |
| `BindAction("Jump", IE_Released, ...)` | При **отпускании** Пробела | `StopJumping()` — персонаж перестаёт прыгать |

> ⚠️ Функции `Jump()` и `StopJumping()` **уже встроены** в класс `ACharacter`. Писать их самому не нужно!

---

## 🔹 ЭТАП 3: КОМПИЛЯЦИЯ (ОБЯЗАТЕЛЬНО!)

После изменения кода **обязательно** пересобери проект:

1. Сохрани файл (`Ctrl+S`).
2. Закрой **VS Code**.
3. Закрой **Unreal Editor**.
4. Удали папки в корне проекта:
   - `Binaries/`
   - `Intermediate/`
   - `Saved/`
5. Найди файл `RunAndSurvive.uproject` и **дважды кликни** по нему.
6. Если появится окно **"The following modules are missing..."** — нажми **"Да"**.
7. Дождись компиляции.

---

## 🔹 ЭТАП 4: НАСТРОЙКА СИЛЫ ПРЫЖКА (если нужно)

Если персонаж прыгает **слишком слабо** или **слишком высоко**:

1. Открой **BP_MyHero** (дважды кликни).
2. В левой панели **"Компоненты"** выбери **CharacterMovement**.
3. В правой панели **"Подробности"** найди раздел **"Character Movement: Jumping / Falling"**.
4. Настрой параметры:

| Параметр | Значение по умолчанию | Что делает |
|----------|----------------------|------------|
| **Jump Z Velocity** | 600 | Сила прыжка (чем больше — тем выше) |
| **Air Control** | 0.2 | Управление в воздухе (0 = нет, 1 = полное) |
| **Gravity Scale** | 1.0 | Гравитация (чем больше — тем быстрее падает) |

5. **Скомпилируй** → **Сохрани**.

---

## 🔹 ЭТАП 5: ТЕСТ

1. Нажми **"Играть"** (зелёный треугольник).
2. Нажми **Пробел** — персонаж должен подпрыгнуть.

---

## ✅ ИТОГ

После выполнения всех этапов:
- ✅ Персонаж **прыгает** по нажатию Пробела.
- ✅ Прыжок можно **настроить** через CharacterMovement.
- ✅ Код **скомпилирован** и работает.

---

## 📌 ПОЛЕЗНЫЕ СОВЕТЫ

1. **Всегда** удаляй `Binaries/`, `Intermediate/`, `Saved/` после серьёзных изменений в коде — это решает 90% проблем.
2. **Проверяй** настройки ввода в **Настройки проекта → Движок → Ввод**.
3. **Сохраняй** файлы перед компиляцией (`Ctrl+S`).

# Вопросы
1. Что за папки `Binaries/`, `Intermediate/`, `Saved/`?
* Binaries/	Готовый код, который запускает движок
* Intermediate/	Временные файлы сборки: .obj, .gen.cpp, кэш	Промежуточные файлы, созданные при компиляции
* Saved/	Логи, настройки пользователя, кэш, автосохранения	Данные, которые Unreal сохраняет для тебя