<script>
import { MessageBox } from 'mint-ui'

MessageBox.confirm('',{
	title:'提示',
	message:'我帅吗',
	confirmButtonText:'确认',
	cancelButtonText:'取消'
}).then(action => {
	console.log(23);
	if (action == 'confirm') {
		console.log('点击确认'); 
	}
}).catch(error =>{
	if(error == 'cancel'){
		console.log('点击取消');
	}
});