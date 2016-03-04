<?php
class Duoshuo_LocalServer{
	
	protected $response = array();
	
	protected $plugin;
	
	public function __construct($plugin){
		$this->plugin = $plugin;
	}
	
	/**
	 * �ӷ�����pull���۵�����
	 * 
	 * @param array $input
	 */
	public function sync_log($input = array()){
		$syncLock = $this->plugin->getOption('sync_lock');//����Ƿ�����ͬ������ ͬ����ɺ��ֵ����0
		if(!isset($syncLock) || $syncLock > time()- 900){//���ڻ�15�����ڷ�����д�ص�û��0
			$response = array(
					'code'	=>	Duoshuo_Exception::SUCCESS,
					'response'=> 'ͬ���У����Ժ�',
			);
			return;
		}
		
		$this->plugin->updateOption('sync_lock',  time());
		
		$last_sync = $this->plugin->getOption('last_sync');
		
		$limit = 20;
		
		$params = array(
			'since_id' => $last_sync,
			'limit' => $limit,
			'order' => 'asc',
		);
		
		$client = $this->plugin->getClient();
		
		$posts = array();
		$affectedThreads = array();
		$last_log_id = 0;
		
		do{
			$response = $client->getLogList($params);
		
			$count = count($response['response']);
			
			foreach($response['response'] as $log){
				switch($log['action']){
					case 'create':
						$affected = $this->plugin->createPost($log['meta']);
						break;
					case 'approve':
					case 'spam':
					case 'delete':
						$affected = $this->plugin->moderatePost($log['action'], $log['meta']);
						break;
					case 'delete-forever':
						$affected = $this->plugin->deleteForeverPost($log['meta']);
						break;
					case 'update'://���ڲ�û��update�������߼�
					default:
						$affected = array();
				}
				//�ϲ�
				
				$affectedThreads = array_merge($affectedThreads, $affected);
			
				if (strlen($log['log_id']) > strlen($last_log_id) || strcmp($log['log_id'], $last_log_id) > 0)
					$last_log_id = $log['log_id'];
			}
			
			$params['since_id'] = $last_log_id;
				
		} while ($count == $limit);//������غ������������һ�£�����ȡһ��
		
		//Ψһ��
		$aidList = array_unique($affectedThreads);
				
		if (strlen($last_log_id) > strlen($last_sync) || strcmp($last_log_id, $last_sync) > 0)
			$this->plugin->updateOption('last_sync', $last_log_id);
		
		$this->plugin->updateOption('sync_lock',  0);
		
		//���¾�̬�ļ�
		if ($this->plugin->getOption('seo_enabled'))
			$this->plugin->refreshThreads($aidList);
		
		$this->plugin->updateOption('sync_lock', 1);
		
		
		//$this->response['response']
		$this->response['code'] = Duoshuo_Exception::SUCCESS;
	}
	
	public function update_option($input = array()){
		//duoshuo_short_name
		//duoshuo_secret
		//duoshuo_notice
		foreach($input as $optionName => $optionValue)
			if (substr($optionName, 0, 8) === 'duoshuo_'){
				$this->plugin->updateOption(substr($optionName, 8), $optionValue);
			}
		$this->response['code'] = 0;
	}
	
	public function sendResponse(){
		echo json_encode($this->response);
	}
	
	public function dispatch($input){
		if (!isset($input['signature']))
			throw new Duoshuo_Exception('Invalid signature.', Duoshuo_Exception::INVALID_SIGNATURE);
		
		$signature = $input['signature'];
		unset($input['signature']);
		
		ksort($input);
		$baseString = http_build_query($input, null, '&');
		
		$expectSignature = base64_encode(hash_hmac('sha1', $baseString, $this->plugin->getOption('secret'), true));
		if ($signature !== $expectSignature)
			throw new Duoshuo_Exception('Invalid signature, expect: ' . $expectSignature . '. (' . $baseString . ')', Duoshuo_Exception::INVALID_SIGNATURE);
		
		$method = $input['action'];
		
		if (!method_exists($this, $method))
			throw new Duoshuo_Exception('Unknown action.', Duoshuo_Exception::OPERATION_NOT_SUPPORTED);
		
		$this->$method($input);
		$this->sendResponse();
	}
	
	static function sendException($e){
		$response = array(
			'code'	=>	$e->getCode(),
			'errorMessage'=>$e->getMessage(),
		);
		echo json_encode($response);
	}
}
