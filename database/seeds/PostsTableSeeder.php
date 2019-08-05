<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class PostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('posts')->insert([
            'author_id' => 1,
            'category_id' => 1,
            'photo' => 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg',
            'title' => 'Смотрите какой красивый страус',
            'description' => 'Такого страуса вы можете встретить где угодно',
            'content' => 'Африканский страус — самая крупная из современных птиц: высотой до 270 см и массой до 156 кг. Страус имеет плотное телосложение, длинную шею и небольшую уплощённую голову. Клюв прямой и плоский, с роговым «когтем» на надклювье, довольно мягкий. Глаза большие, с густыми ресницами на верхнем веке. Страусы — нелетающие птицы. Для них характерно полное отсутствие киля и слаборазвитая грудная мускулатура; скелет не пневматичен, за исключением бедренных костей. Крылья у страусов недоразвитые; два пальца на них заканчиваются когтями, или шпорами. Задние конечности длинные и сильные, всего с двумя пальцами. Один из пальцев заканчивается подобием рогового копыта — на него птица опирается при беге.[источник не указан 2358 дней] Оперение у страуса рыхлое и курчавое. Перья растут по всему телу более-менее равномерно, птерилии отсутствуют. Строение пера примитивное: бородки почти не сцеплены друг с другом, поэтому плотных пластинок-опахал не образуется. Не оперены голова, шея и бёдра. На груди также имеется голый участок кожи, грудная мозоль, на которую страус опирается, когда ложится. Цвет оперения у взрослого самца чёрный; перья хвоста и крыльев белые. Самка страуса мельче самца и окрашена однообразно — в серовато-бурые тона; перья крыльев и хвоста — грязно-белые.',
            'views' => 1500,
            'status_id' => 1,
            'created_at' => Carbon::now()
        ]);
        DB::table('posts')->insert([
            'author_id' => 2,
            'category_id' => 2,
            'photo' => 'https://cs9.pikabu.ru/post_img/big/2017/04/24/7/1493030070160053151.jpg',
            'title' => 'Бог или инопланетянин? Кто он?',
            'description' => 'Месси играет, как мальчишка, который сказал матери: «Пойду погоняю мяч. Вернусь, когда стемнеет». Его не волнуют ни полные трибуны, ни прочие привходящие обстоятельства. Это природный талант, который, играя, получает удовольствие.',
            'content' => 'Из отпуска вернулись все игроки, участвовавшие в матчах Кубка Америки, а самое главное — Лео Месси. Стадион очень тепло приветствовал любимую команду, а Антуану Гризманну даже устроили овацию, опровергнув тем самым все домыслы о прохладном приеме со стороны болельщиков. Несмотря на то, что Месси в матче за Кубок Гампера не участвовал, трибуны не смолкали, скандируя «Месси, Месси, Месси!», празднуя возвращение капитана «блауграны». Тем не менее, несмотря на то, что стадион «гнал» «Барсу» вперед, первый тайм остался за «Арсеналом» и Обамеянг испортил дебют Нето на «Камп Ноу», не дав тому отстоять на ноль. Во втором тайме новичка сменил Марк-Андре тер Стеген. Одним из самых ярких игроков матча стал воспитанник «Барсы» Рики Пуч. Тут даже слов не нужно, просто смотрите видео.Ну, а еще один новичок «сине-гранатовых» Френки де Йонг даже получил приз лучшему игроку матча. Уверены, это дадеко не в последний раз! Что касается Антуана Гризманна, то он очень хотел оправдать ожидания болельщиков и даже благодаря шикарной передаче Ракитича организовал гол, но, к сожалению, забил из офсайда. На 69-й минуте автогол Мэйтленд-Найлза накалил атмосферу на «Камп Ноу» до предела. К тому моменту Усмана Дембеле уже заменил Луис Суарес — единственный из «отпускников», поучаствовавший в этом матче. ',
            'views' => 150,
            'status_id' => 1,
            'created_at' => Carbon::now()
        ]);
        DB::table('posts')->insert([
            'author_id' => 1,
            'category_id' => 3,
            'photo' => 'https://img-c.drive.ru/models.large.main.images/0000/000/000/000/de5/48d45147112b1286-main.jpg',
            'title' => 'Вы тоже считаете Audi A5 лучшей машиной?',
            'description' => 'да',
            'content' => 'У этой модели довольно редкий тип кузова — пятидверное купе. Это значит, что эмоциональный дизайн сочетается с выдающейся практичностью, динамичным характером и безупречной управляемостью. Выглядит автомобиль как стремительное купе, но длинная колёсная база (чуть больше, чем у седана Audi A4) и подъёмная дверь багажного отделения говорят о невероятной функциональности. До пяти полноценных мест в салоне, багажник объёмом 480 л, полный привод quattro как стандарт большинства версий Audi A5 Sportback и множество привлекательных опций на заказ: от матричных светодиодных фар, ассистента движения в пробках и парковочного автопилота до эксклюзивных цветов кузова и индивидуальных вариантов кожаной отделки салона.Audi A5 Sportback стал победителем в категории среднеразмерных автомобилей («Midsize») по итогам голосования Best Cars, которое проводится среди читателей журнала Auto motor und sport уже в 42-й раз. Награду вручили в конце января в Штутгарте Петеру Мертенсу (Peter Mertens), члену правления AUDI AG, ответственному за техническое развитие.Audi A5 Sportback назван лучшим автомобилем в категории «Средний класс» по мнению читателей журнала «За рулем» Элегантный, спортивный и одновременно практичный Audi A5 Sportback стал лауреатом престижной премии Гран-при «За рулем» в категории «Средний класс». Читатели журнала выбирали лучшие автомобили с помощью онлайн-голосования, в котором приняли участие более 20 тысяч человек. В десяти различных категориях номинанты оценивались по трем основным критериям: технические характеристики, дизайн и практичность.',
            'views' => 2000,
            'status_id' => 1,
            'created_at' => Carbon::now()
        ]);
    }
}