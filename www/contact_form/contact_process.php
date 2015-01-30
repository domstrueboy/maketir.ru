<?php

include dirname(dirname(__FILE__)).'/mail.php';

error_reporting (E_ALL ^ E_NOTICE);

$post = (!empty($_POST)) ? true : false;

if($post){
	
	$name = $_POST['name'];
	$phone = $_POST['phone'];
	$email = $_POST['email'];
	$total = $_POST['total'];
	$smstext = "Заказ орехи от ".$name." тел: ".$phone." сум: ".$total;
	$goods = $_POST['goods'];
	$tr = '';
	$error = '';

	function ValidateEmail($value){
		$regex = '/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i';
		if($value == '') { 
			return false;
		} else {
			$string = preg_replace($regex, '', $value);
		}
		return empty($string) ? true : false;
	}

	if(!ValidateEmail($email)){
	    $error .= 'Email введен неправильно!<br />';
	}
	if(!$name){
		$error .= 'Пожалуйста, введите ваше имя.<br />';
	}
	if(!$phone){
		$error .= 'Пожалуйста, введите ваш телефон.<br />';
	}

	if(!$error){

		foreach ($goods as $item) {
			$tr = $tr . '<tr><td>' . $item['productNameRus'] . '</td>' .
			'<td>' . $item['productPrice'] . '</td>' .
			'<td>' . ((int)$item['amount'] * 500) . '</td>' .
			'<td>' . $item['productSum'] . '</td></tr>';
		}

		$subject = 'Заявка на орехи';

		$message = '
			<html>
				<head>
					<title>Заявка на орехи</title>
					<style>
				     td, th{
				      border: 1px solid #d4d4d4;
				      padding: 5px;    
				     }
				  	</style>
				</head>
				<body>
					<h2>Заказ</h2>
					<table>
						<thead>
							<tr> 
								<th>Название товара</th> 
								<th>Цена (рубли)</th> 
								<th>Вес (граммы)</th> 
								<th>Сумма по товару</th> 
							</tr>
						</thead>
						<tbody>'
						. $tr .
						'</tbody>
					</table>
					<p>Итого: ' . $total . ' руб.<p>
					<h2>Заказчик</h2>
					<table>
						<thead>
							<tr> 
								<th>Имя</th> 
								<th>Телефон</th> 
								<th>Email</th> 
							</tr>
						</thead>
						<tbody>
							<tr> 
								<td>' . $name . '</td> 
								<td>' . $phone . '</td> 
								<td>' . $email . '</td> 
							</tr>
						</tbody>
					</table>
				</body>
			</html>';

		// $headers  = "Content-type: text/html; charset=utf-8 \r\n";
		// $headers .= "From: Yawork <franshiza@yawork.ru>\r\n";

		$mail = mail(CONTACT_FORM, $subject, $message,
		     "From: ".$name." <".$email.">\r\n"
		    ."Reply-To: ".$email."\r\n"
		    ."Content-type: text/html; charset=utf-8 \r\n"
		    ."X-Mailer: PHP/" . phpversion());

		if($mail){

			echo 'OK';

			// sms
			require_once 'sms.php';

			$user = 'kovaldn@gmail.com';            // логин указанный при регистрации или логин api-аккаунта http://littlesms.ru/my/settings/api
			$key  = 'BCn6NY';   // API-key, узнать можно тут: http://littlesms.ru/my/settings/api
			$ssl  = false;                 // использовать защищенное SSL-соединение

			$api = new LittleSMS($user, $key, $ssl);

			// запрос баланса
			// echo 'Мой баланс: ' . $api->userBalance(), PHP_EOL;

			// отправка СМС
			$ids = $api->messageSend('79312626089', $smstext);
			// if ($ids) {
			//   echo "ID отправленных СМС:\n";
			//   print_r($ids);
			// } else {
			//   echo "Ошибки:\n";
			//   print_r($api->getResponse());
			// }

			// запрос статуса сообщения
			// $result = $api->messageStatus($ids);

			// foreach ($result as $message_id => $status) {
			//     echo sprintf('Статус сообщения %s: %s', $message_id, $status), PHP_EOL;
			// }
			// end sms
		}

	}else{
		echo '<div class="bg-danger">'.$error.'</div>';
	}

}

?>