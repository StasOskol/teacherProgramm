Unreal Engine 5.7 + VS Code + C++ + Blueprint
🎯 Цель
Создать проект, в котором есть персонаж, управляемый с клавиатуры и мыши, с использованием C++ и Blueprint.

🔹 ЭТАП 1: УСТАНОВКА РАСШИРЕНИЙ VS CODE (ДЕЛАЕТСЯ ОДИН РАЗ)
Открой VS Code.

Нажми Ctrl+Shift+X (панель расширений).

Установи три расширения:

C/C++ Extension Pack

C# Dev Kit

UE5 Development Tools

Перезапусти VS Code.

🔹 ЭТАП 2: СОЗДАНИЕ ПРОЕКТА
Открой Epic Games Launcher → запусти Unreal Engine 5.7.

В окне Project Browser:

Выбери Игры (Games) → Пустой (Blank).

Обязательно выбери C++ (не Blueprint!).

Назови проект: RunAndSurvive.

Укажи папку: C:\Users\Liza\Desktop\Git\

Нажми "Создать".

Важно: Не открывай VS Code вручную. Проект создастся сам.

🔹 ЭТАП 3: ПЕРВЫЙ ЗАПУСК ПРОЕКТА (ПРОВЕРКА)
Найди файл RunAndSurvive.uproject в папке:

text
C:\Users\Liza\Desktop\Git\RunAndSurvive\RunAndSurvive\
Дважды кликни по нему.

Unreal Editor должен открыться без ошибок.

Закрой Unreal Editor.

🔹 ЭТАП 4: НАСТРОЙКА ВВОДА (КЛАВИШИ)
Открой проект через .uproject.

В Unreal Editor: Правка → Настройки проекта → Движок → Ввод.

В разделе "Назначения осей" (Axis Mappings) нажми "Добавить" для каждой строки:

Имя оси	Клавиша	Масштаб (Scale)
MoveForward	W	1.0
MoveForward	S	-1.0
MoveRight	D	1.0
MoveRight	A	-1.0
Turn	Mouse X	1.0
LookUp	Mouse Y	-1.0
В разделе "Назначения действий" (Action Mappings) нажми "Добавить":

Имя действия	Клавиша
Jump	Space Bar
Закрой настройки.

🔹 ЭТАП 5: СОЗДАНИЕ C++ КЛАССА ПЕРСОНАЖА
В Unreal Editor: Инструменты → Программирование → Новый класс C++....

Выбери родительский класс Character.

Назови класс: MyHero.

Нажми "Создать".

Важно: VS Code откроется автоматически. Не закрывай его, пока не напишешь код.

🔹 ЭТАП 6: НАПИСАНИЕ КОДА (СКОПИРУЙ И ВСТАВЬ)
В файле MyHero.h
Найди строку GENERATED_BODY() и после неё добавь:

cpp
public:
    void MoveForward(float Value);
    void MoveRight(float Value);
В файле MyHero.cpp
Найди функцию SetupPlayerInputComponent и замени её на:

cpp
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
В самый конец файла (после последней }) добавь:

cpp
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
Сохрани файлы (Ctrl+S).

Закрой VS Code.

🔹 ЭТАП 7: КОМПИЛЯЦИЯ (САМЫЙ ВАЖНЫЙ ШАГ)
Закрой Unreal Editor.

Найди файл RunAndSurvive.uproject.

Дважды кликни по нему.

Если появится окно "The following modules are missing..." — нажми "Да".

Дождись компиляции (внизу будет прогресс-бар).

Unreal Editor откроется.

Проверь: В Контент браузере → Классы C++ → RunAndSurvive должен появиться MyHero.

🔹 ЭТАП 8: СОЗДАНИЕ BLUEPRINT ПЕРСОНАЖА
В Контент браузере открой папку "Классы C++" → "RunAndSurvive".

Найди MyHero → нажми правой кнопкой → "Создать Blueprint класс на основе MyHero".

Назови: BP_MyHero.

🔹 ЭТАП 9: НАСТРОЙКА КАМЕРЫ В BLUEPRINT
Дважды кликни по BP_MyHero.

В левой панели "Компоненты" нажми "Добавить компонент" → добавь SpringArmComponent.

Снова "Добавить компонент" → добавь CameraComponent.

В "Подробностях" для SpringArm:

Длина → 400

Use Pawn Control Rotation → ✅ (галочка)

В "Подробностях" для Camera:

Use Pawn Control Rotation → ❌ (сними галочку)

Нажми "Скомпилировать" → "Сохранить".

🔹 ЭТАП 10: СОЗДАНИЕ GAMEMODE
В Контент браузере нажми правой кнопкой → "Создать Blueprint класс".

Выбери GameModeBase → назови BP_GameMode.

Дважды кликни по BP_GameMode.

В "Подробностях" найди "Default Pawn Class" → выбери BP_MyHero.

Нажми "Скомпилировать" → "Сохранить".

🔹 ЭТАП 11: НАЗНАЧЕНИЕ GAMEMODE
Правка → Настройки проекта → Карты и режимы.

В поле "Режим игры по умолчанию" выбери BP_GameMode.

🔹 ЭТАП 12: ДОБАВЛЕНИЕ ТОЧКИ СТАРТА
На сцене (в 3D-виде) посмотри, есть ли PlayerStart.

Если нет — найди в Контент браузере → "Движок" → "Базовые" → PlayerStart.

Перетащи его на сцену.

Поставь координаты Z = 100 (над землёй).

🔹 ЭТАП 13: ТЕСТ
Нажми "Играть" (зелёный треугольник).

Проверь:

WASD — движение.

Мышь — поворот камеры.

Пробел — прыжок.

✅ ИТОГ
Теперь у тебя есть:

✅ Работающий проект Unreal Engine 5.7.

✅ C++ класс персонажа (MyHero), который ходит и поворачивается.

✅ Blueprint персонажа (BP_MyHero) с камерой.

✅ GameMode (BP_GameMode) с назначенным персонажем.

✅ Точка старта (PlayerStart) на сцене.

✅ Персонаж не пропадает после перезапуска.