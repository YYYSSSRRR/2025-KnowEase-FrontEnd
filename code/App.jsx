import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './LoginPage';
import Agreement from './Agreement';
import Register from './Register'
import SetPassword from './SetPassword'
import ForgetPassword from './ForgetPassword'
import LifeZone from './LifeZone';
import AddPost from './AddPost';
import ResetPassword from './ResetPassword';
import My from './My';
import PostDetail from './PostDetail';
import EditInformation from './EditInformation';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import OtherPeople from './OtherPeople';
import LikeRecord from './LikeRecord';
import ViewRecord from './ViewRecord';
import Start from './Start';
import SaveRecord from './SaveRecord';
import MyMessage from './MyMessage';
import Qusetion from './Question';
import AddQuestion from './AddQuestion';
import PostRecord from './PostRecord';
import QuestionDetail from './QuestionDetail';
import Search from './Search';
import SearchPostResult from './SearchPostResult';
import AIChat from './AIChat';
import ChatRoom from './ChatRoom';
import AIChatRecord from './AIChatRecord';
import UserChat from './UserChat';
import LikeMessage from './LikeMessage';
import CommentMessage from './CommentMessage';
import FollowMessage from './FollowMessage';
const Stack = createStackNavigator()
export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Start" component={Start}></Stack.Screen>
        <Stack.Screen name="Login" component={LoginPage}></Stack.Screen>
        <Stack.Screen name="Agreement" component={Agreement}></Stack.Screen>
        <Stack.Screen name='Register' component={Register}></Stack.Screen>
        <Stack.Screen name='SetPassword' component={SetPassword}></Stack.Screen>
        <Stack.Screen name='ForgetPassword' component={ForgetPassword}></Stack.Screen>
        <Stack.Screen name='LifeZone' component={LifeZone}></Stack.Screen>
        <Stack.Screen name='AddPost' component={AddPost}></Stack.Screen>
        <Stack.Screen name='ResetPassword' component={ResetPassword}></Stack.Screen>
        <Stack.Screen name='My' component={My}></Stack.Screen>
        <Stack.Screen name='PostDetail' component={PostDetail}></Stack.Screen>
        <Stack.Screen name='EditInformation' component={EditInformation}></Stack.Screen>
        <Stack.Screen name='ChangeEmail' component={ChangeEmail}></Stack.Screen>
        <Stack.Screen name='ChangePassword' component={ChangePassword}></Stack.Screen>
        <Stack.Screen name='OtherPeople' component={OtherPeople}></Stack.Screen>
        <Stack.Screen name='LikeRecord' component={LikeRecord}></Stack.Screen>
        <Stack.Screen name='ViewRecord' component={ViewRecord}></Stack.Screen>
        <Stack.Screen name='SaveRecord' component={SaveRecord}></Stack.Screen>
        <Stack.Screen name='MyMessage' component={MyMessage}></Stack.Screen>
        <Stack.Screen name='Question' component={Qusetion}></Stack.Screen>
        <Stack.Screen name='AddQuestion' component={AddQuestion}></Stack.Screen>
        <Stack.Screen name='PostRecord' component={PostRecord}></Stack.Screen>
        <Stack.Screen name='QuestionDetail' component={QuestionDetail}></Stack.Screen>
        <Stack.Screen name='Search' component={Search}></Stack.Screen>
        <Stack.Screen name='SearchPostResult' component={SearchPostResult}></Stack.Screen>
        <Stack.Screen name='AIChat' component={AIChat}></Stack.Screen>
        <Stack.Screen name='ChatRoom' component={ChatRoom}></Stack.Screen>
        <Stack.Screen name='AIChatRecord' component={AIChatRecord}></Stack.Screen>
        <Stack.Screen name='UserChat' component={UserChat}></Stack.Screen>
        <Stack.Screen name='LikeMessage' component={LikeMessage}></Stack.Screen>
        <Stack.Screen name='CommentMessage' component={CommentMessage}></Stack.Screen>
        <Stack.Screen name='FollowMessage' component={FollowMessage}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}