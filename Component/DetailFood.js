import React, { Component } from "react";
import { Text, View, Image, ScrollView, TouchableOpacity, Platform, TextInput } from "react-native";
import { Rating, Avatar, AirbnbRating, Icon, Input  } from "react-native-elements";
import firebase from 'react-native-firebase';
import ComponentWithTitle from "./ComponentWithTitle";
import RoundButton from "./roundButton";
import Anchor from "./anchor";
import ListView from "./ListView";
import { detailFood, commentStyle, listViewStyle, resInfor, accountStyle } from "../Style/style";
import NetInfo from "@react-native-community/netinfo";
import Message from "./Message";
import ContentLoader from 'rn-content-loader';
import { Rect } from "react-native-svg";


// ---- REPLY COMMENT ------------------------------------------------------------------------------------
class ReplyComment extends Component
{
    constructor(props)
    {
          super(props);
          this.state = {
                liked: false,
                user: firebase.auth().currentUser,
                accountName: "",
                numberOfLikes: 0,
          };
          this.like = this.like.bind(this);
          if (firebase.auth().currentUser)
              this.ref = firebase.firestore().collection( global.UserType + "s" ).doc(firebase.auth().currentUser.uid)
    }


    async like()
    {
          const { commentID } = this.props;
          const account = await this.ref.get();
          const comment = firebase.firestore().collection("Comment").doc(commentID);
          if (this.state.liked)
          {
                const likeList = account.data().likedComment;
                let newLikeList = likeList.substr(0, likeList.indexOf(commentID)) + likeList.substr( likeList.indexOf(commentID) + 21);
                this.ref.update({ likedComment: newLikeList });
                comment.update({ numberOfLikes: this.state.numberOfLikes - 1 });
                this.setState({
                        liked: false,
                        numberOfLikes: this.state.numberOfLikes - 1
                  });
          }
          else
          {
                const likeList = account.data().likedComment;
                let newLikeList = likeList + " " + commentID;
                this.ref.update({ likedComment: newLikeList });
                comment.update({ numberOfLikes: this.state.numberOfLikes + 1 });
                this.setState({
                        liked: true,
                        numberOfLikes: this.state.numberOfLikes + 1
                  });
          }
    }


    async componentDidMount()
    {
        const { commentID } = this.props;
        // ==== Find account infomation =============================================================================================
        if (firebase.auth().currentUser)
        {
            const account = await firebase.firestore().collection( global.UserType + "s" ).doc( firebase.auth().currentUser.uid ).get();
            const isLiked = (account.data().likedComment.indexOf(commentID) !== -1);
            this.setState({ liked: isLiked });
        }
        firebase.firestore().collection( "Customers" ).doc( this.props.UID ).get().then((info)=>{
               if (info.exists) this.setState({ accountName: info.data().NameCUS});
        });
        setTimeout( ()=>{
                firebase.firestore().collection( "Restaurants" ).doc( this.props.UID ).get().then( x =>{
                      if (x.exists) this.setState({ accountName: x.data().NameRES });
                })
        }, 50);

        this.setState({ numberOfLikes: this.props.numberOfLikes });
    }


    render()
    {
          const { content, time } = this.props;
          return (
                <View style={ [commentStyle.wrapper, { marginLeft: "15%", borderTopColor: "rgba(0, 0, 0, 0.1)", borderTopWidth: 1, borderBottomWidth: 0, width: "85%"}] }>
                       <View style={ commentStyle.avatarAndName }>
                             <Avatar
                                     size="small"
                                     rounded
                                     icon={{type: "evilicon", name: "user", color: "white"}}
                                     containerStyle={{}}
                             />
                            <View style={ [commentStyle.nameAndTime, {width: "75%"}] }>
                                   <Text style={ commentStyle.nameText }>{ this.state.accountName }</Text>
                                   <View style={ commentStyle.time }>
                                         <Icon
                                               name="md-time"
                                               type="ionicon"
                                               size={15}
                                               color="gray"
                                         />
                                         <Text style={ commentStyle.timeText }>{ time }</Text>
                                   </View>
                            </View>

                           <View style={ [commentStyle.anchorWrapper, {width: "15%"}] }>
                                   {( this.state.user && !this.props.isDeleted ?
                                         <View style={{width: "50%",  display: "flex", justifyContent: "center", alignItems: "center"}}>
                                               <Icon
                                                     name="like1"
                                                     type="antdesign"
                                                     size={20}
                                                     color={ (this.state.liked ? "#2089DC" : "gray" )}  /* change color when liked */
                                                     onPress = { this.like }
                                               />
                                               <Text style={{ fontSize: 10, color:  (this.state.liked ? "#2089DC" : "gray" ), width: "100%", textAlign: 'center', fontWeight: (this.state.liked ? "bold" : "normal")}}>{ this.state.numberOfLikes }</Text>
                                         </View> : null
                                   )}
                           </View>
                       </View>
                       <Text style={ commentStyle.content }>{ content }</Text>
               </View>
        );
    }
}
// ---- THIS IS COMMENT CLASS -----------------------------------------------------------------------------
class Comment extends Component
{
  constructor(props)
  {
        super(props);
        this.state = {
              liked: false,
              user: firebase.auth().currentUser,
              accountName: "",
              numberOfLikes: 0,
              numberOfReply: 0,
              replyComment : [],
              isReply: false
        };
        this.like = this.like.bind(this);
        if (firebase.auth().currentUser)
            this.ref = firebase.firestore().collection( global.UserType + "s" ).doc(firebase.auth().currentUser.uid)
        this.getReplyComment = this.getReplyComment.bind(this);
        this.update = this.update.bind(this);
  }
  update(item)
  {
        let comment = this.state.replyComment;
        comment.push(item);
        this.setState({ replyComment: comment, numberOfReply: this.state.numberOfReply + 1 });
  }

  getReplyComment()
  {
        firebase.firestore().collection("Comment").where("Reply", "==", true).where("ReplyForID", '==', this.props.commentID).limit(10).get().then(doc=>{
                doc.forEach(item=>{
                    const comment = {
                          CommentID: item.data().CommentID,
                          Content: item.data().Content,
                          Time: item.data().Time,
                          numberOfLikes: item.data().numberOfLikes,
                          UID: item.data().UID,
                    };
                    let temp = this.state.replyComment;
                    temp.push(comment);
                    this.setState({ replyComment: temp });
                    console.log(this.state.replyComment);
                });
        });
  }


  async like()
  {
        const { commentID } = this.props;
        const account = await this.ref.get();
        const comment = firebase.firestore().collection("Comment").doc(commentID);
        if (this.state.liked)
        {
              const likeList = account.data().likedComment;
              let newLikeList = likeList.substr(0, likeList.indexOf(commentID)) + likeList.substr( likeList.indexOf(commentID) + 21);
              this.ref.update({ likedComment: newLikeList });
              comment.update({ numberOfLikes: this.state.numberOfLikes - 1 });
              this.setState({
                      liked: false,
                      numberOfLikes: this.state.numberOfLikes - 1
                });
        }
        else
        {
              const likeList = account.data().likedComment;
              let newLikeList = likeList + " " + commentID;
              this.ref.update({ likedComment: newLikeList });
              comment.update({ numberOfLikes: this.state.numberOfLikes + 1 });
              this.setState({
                      liked: true,
                      numberOfLikes: this.state.numberOfLikes + 1
                });
        }
  }

  async componentDidMount()
  {
      const { commentID } = this.props;
      // ==== Find account infomation =============================================================================================
      if (firebase.auth().currentUser)
      {
            const account = await firebase.firestore().collection( global.UserType + "s" ).doc( firebase.auth().currentUser.uid).get();
            const isLiked = (account.data().likedComment.indexOf(commentID) !== -1);
            this.setState({ liked: isLiked });
      }
      firebase.firestore().collection( "Customers" ).doc( this.props.UID ).get().then((info)=>{
             if (info.exists)
                    this.setState({ accountName: info.data().NameCUS});
      });
      setTimeout( ()=>{
        if (this.state.accountName == "")
        {
              firebase.firestore().collection( "Restaurants" ).doc( this.props.UID ).get().then( x =>{
                    if (x.exists) this.setState({ accountName: x.data().NameRES });
              });

        }
      }, 100);
      // ====== Load reply comment =================================================================================================

      // ---- Check if is liked or not --------------------
      this.getReplyComment();

      this.setState({
              numberOfLikes: this.props.numberOfLikes,
              numberOfReply: this.props.numberOfReply
           });


  }

  render()
  {
    const { content, time } = this.props;
    return (
         <View style={ commentStyle.wrapper }>
                <View style={ commentStyle.avatarAndName }>
                      <Avatar
                              size="small"
                              rounded
                              icon={{type: "evilicon", name: "user", color: "white"}}
                              containerStyle={{}}
                      />
                     <View style={ commentStyle.nameAndTime }>
                            <Text style={ commentStyle.nameText }>{ this.state.accountName }</Text>
                            <View style={ commentStyle.time }>
                                  <Icon
                                        name="md-time"
                                        type="ionicon"
                                        size={15}
                                        color="gray"
                                  />
                                  <Text style={ commentStyle.timeText }>{ time }</Text>
                            </View>
                     </View>

                    <View style={ commentStyle.anchorWrapper }>
                            {( this.state.user && !this.props.isDeleted ?
                                  <View style={{width: "50%",  display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <Icon
                                              name="like1"
                                              type="antdesign"
                                              size={20}
                                              color={ (this.state.liked ? "#2089DC" : "gray" )}  /* change color when liked */
                                              onPress = { this.like }
                                        />
                                        <Text style={{ fontSize: 10, color:  (this.state.liked ? "#2089DC" : "gray" ), width: "100%", textAlign: 'center', fontWeight: (this.state.liked ? "bold" : "normal")}}>{ this.state.numberOfLikes }</Text>
                                  </View> : null
                            )}
                            {( this.state.user && !this.props.isDeleted ?
                                  <View style={{width: '50%', display: "flex", justifyContent: "center", alignItems: "center"}}>
                                      <Icon
                                            type="entypo"
                                            name="chat"
                                            size={18}
                                            color="gray"
                                            underlayColor="transparent" //#85776E
                                            onPress={ ()=>this.setState({ isReply: true }) }
                                      />
                                      <Text style={{ fontSize: 10, width: "100%", textAlign: 'center'}}>{ this.state.numberOfReply }</Text>
                            </View>: null
                          )}
                    </View>
                </View>
                <Text style={ commentStyle.content }>{ content }</Text>
                { this.state.replyComment.map( (item, id) => <ReplyComment
                                                                    key={id}
                                                                    commentID={item.CommentID}
                                                                    content ={ item.Content }
                                                                    time = { item.Time }
                                                                    UID = { item.UID }
                                                                    foodID={ this.props.foodID }
                                                                    numberOfLikes={item.numberOfLikes}
                                                                    isDeleted={this.props.isDeleted}
                                                                    /> ) }
                {( this.state.isReply ?
                      <View style={{paddingLeft: "10%"}}>
                            <CommentInput
                                isReply={ true }
                                foodID={ this.props.foodID }
                                UID = { (firebase.auth().currentUser ? firebase.auth().currentUser.uid : 0) }
                                update = { this.update }
                                commentID={ this.props.commentID }
                                numberOfReply={ this.state.numberOfReply }
                            />
                      </View> : null )}
        </View>
    );
  }
}


// ---- THIS IS COMMENT INPUT CLASS -----------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------
class CommentInput extends Component
{
  constructor(props)
  {
    super(props);
    this.state = { content: "" , color: "rgba(0, 0, 0, 0.2)", width: 1 }
    this.comment = this.comment.bind(this);
  }

  async comment()
  {
        const { update } = this.props;
        if (this.state.content !== "")
        {
              const { isReply = false, foodID, UID, commentID = '', numberOfReply = 0 } = this.props;
              const time = new Date();
              const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
              const timeString = time.getHours().toString() + ":" + (time.getMinutes() >= 10 ? time.getMinutes() : "0" + time.getMinutes()) + " " + time.getDate() + "-" + monthNames[time.getMonth()] + "-" + time.getFullYear();
              if (isReply)
              {
                    const content = this.state.content;
                    firebase.firestore().collection("Comment").add({ }).then(
                    (ref)=>
                    {
                          const item = {
                                    Content: content,
                                    FoodID: foodID,
                                    UID: UID,
                                    Reply: true,
                                    ReplyForID: commentID,
                                    numberOfLikes: 0,
                                    Time: timeString,
                                    CommentID: ref.id,
                                    numberOfReply: 0
                          };
                          update(item);
                          firebase.firestore().collection("Comment").doc(ref.id).update( item );
                          firebase.firestore().collection("Comment").doc(commentID).update({ numberOfReply: numberOfReply + 1 });
                    });
              }
              else
              {
                      const content = this.state.content;
                      firebase.firestore().collection("Comment").add({ }).then(
                      (ref)=>
                      {
                            const item = {
                                      Content: content,
                                      FoodID: foodID,
                                      UID: UID,
                                      Reply: false,
                                      ReplyForID: "",
                                      numberOfLikes: 0,
                                      Time: timeString,
                                      CommentID: ref.id,
                                      numberOfReply: 0
                            };
                            update(item);
                            firebase.firestore().collection("Comment").doc(ref.id).update( item );
                      });
              }
              this.setState({ content: "" });
        }
  }

  render()
  {
    return(
          <View style={ commentStyle.inputWrapper } >
              <View style={{ width: "15%"}}>
                    <Avatar
                            size="small"
                            rounded
                            icon={{type: "evilicon", name: "user", color: "white"}}
                            containerStyle={{}}
                    />
              </View>
              <View style={ [commentStyle.input, {borderColor: this.state.color}] }>
                      <TextInput
                          placeholder="Comment here..."
                          style={{ color: "gray", width: "90%", paddingVertical: 5, paddingHorizontal: 15}}
                          onChangeText={(text) => this.setState({ content: text})}
                          value={this.state.content}
                          multiline
                          underlineColorAndroid="rgba(0, 0, 0, 0)"
                          onFocus={ ()=> this.setState({  color: "#2089DC"}) }
                          onBlur={ ()=> this.setState({ color: "rgba(0, 0, 0, 0.2)"}) }
                       />
                       <TouchableOpacity
                            style={{width: "10%"}}
                            activeOpacity={0.7}
                            onPress={ this.comment }
                            >
                             <Icon
                                type="ionicon"
                                name="md-send"
                                color={(this.state.content === "" ? "gray" :  "#2089DC")}
                             />
                       </TouchableOpacity>
                </View>
          </View>
    );
  }
}

// ------ DETAIL FOOD ---------------------------------------------------------------------------------------------
export default class DetailFood extends Component
{
  static navigationOptions = ({ navigation }) => ({
      title: navigation.state.params.data.title,
      headerTitleStyle: accountStyle.titleStyle
    });


  constructor(props)
  {
    super(props);
    this.state = {
          like: false,   // Lay du lieu tu db,
          rate: false,
          rateVal: 0,
          user: firebase.auth().currentUser,
          showMessage: false,
          message: "",
          data: { price: 0, feedBack: 0, orderCount: 0, resRating: 0 },
          loading: true,
          similarLoading: true,
          similar: [],
          commentList: [],
          isOrderSuccess: false,
          isDeleted: false
       }
     this.like = this.like.bind(this);
     this.rating = this.rating.bind(this);
     if (firebase.auth().currentUser)
          this.ref = firebase.firestore().collection( global.UserType + "s" ).doc( firebase.auth().currentUser.uid)
     this.updateNewComment = this.updateNewComment.bind(this);
     this.OrderSuccess = this.OrderSuccess.bind(this);
     this.loadComment = this.loadComment.bind(this);
     this.loadingSimilarFood = this.loadingSimilarFood.bind(this);
  }
 // ============== Like Food function handling =================================================================
  like() {
    if (!this.state.loading)
    {
      NetInfo.getConnectionInfo().then( async (data)=>{
          if (data.type === "unknown" || data.type === "none")
          {
                this.setState({showMessage: false, like: !this.state.like })
                setTimeout(()=>this.setState( {message: "We can't save your result because of your internet connection", showMessage: true} ), 20);
           }
          else {
              if (firebase.auth().currentUser)
              {
                  const infoAccount = await this.ref.get();
                  const likeFood = infoAccount.data().likeFood;
                  if (this.state.like)
                  {
                       let newLikeFood = likeFood.substr(0, likeFood.indexOf( this.props.navigation.getParam("data").id )) + likeFood.substr( likeFood.indexOf(this.props.navigation.getParam("data").id) + 33);
                       this.ref.update({ likeFood: newLikeFood });
                       this.setState({ like: false });
                  }
                  else
                  {
                    const time = new Date();
                    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    const timeString = "-" + (time.getDate() < 10 ? "0" + time.getDate() : time.getDate()) + "-" + monthNames[time.getMonth()] + "-" + time.getFullYear();
                       this.ref.update({ likeFood: likeFood + " " + this.props.navigation.getParam("data").id + timeString });
                       this.setState({ like: true });
                  }
              }
          }
      });
   }
}
// ======== Rating function handling function =======================================================================
rating(val)
  {
    if (!this.state.loading)
    {
        NetInfo.getConnectionInfo().then( async (data)=>{
            if (data.type === "unknown" || data.type === "none")
            {
                  this.setState({showMessage: false})
                  setTimeout(()=>this.setState( {message: "We can't save your result because of your internet connection", showMessage: true} ), 20);
             }
            else {
                if (firebase.auth().currentUser)
                {
                    const infoAccount = await this.ref.get();
                    let rating = infoAccount.data().rating;
                    if (this.state.rate)
                    {
                            let oldRating = Number(rating.substr(rating.indexOf(this.props.navigation.getParam("data").id) + 21, 1).trim());
                            let newRating = rating.substr(0, rating.indexOf(this.props.navigation.getParam("data").id) + 21) + val + rating.substr(rating.indexOf(this.props.navigation.getParam("data").id) + 22);
                            this.ref.update({ rating: newRating });
                            // ---- Update food -----------------------------
                            let newRateFood = Number(((this.state.data.numRate * this.state.data.rating - oldRating + val) / this.state.data.numRate).toFixed(1));
                            firebase.firestore().collection("Food").doc(this.state.data.foodID).update({ rating: newRateFood });
                            // ----- Update restaurant ----------------------
                            let newRateRes = Number(((this.state.data.resNumRate * this.state.data.resRating - oldRating + val) / this.state.data.resNumRate).toFixed(1));
                            firebase.firestore().collection("Restaurants").doc(this.state.data.resID).update({ Rating: newRateRes });
                            this.setState({
                                rateVal: val,
                                data: {...this.state.data, rating: newRateFood, resRating: newRateRes  }
                            });

                    }
                    else
                    {
                            rating = rating + " " + this.props.navigation.getParam("data").id + "-" + val;
                            this.ref.update({ rating: rating });
                            // ---- Update food -----------------------------
                            let newRateFood = Number(((this.state.data.numRate * this.state.data.rating + val) / (this.state.data.numRate + 1)).toFixed(1));
                            firebase.firestore().collection("Food").doc(this.state.data.foodID).update({ rating: newRateFood, numRate: this.state.data.numRate + 1 });
                            // ----- Update restaurant ----------------------
                            let newRateRes = Number(((this.state.data.resNumRate * this.state.data.resRating  + val) / (this.state.data.resNumRate + 1)).toFixed(1));
                            firebase.firestore().collection("Restaurants").doc(this.state.data.resID).update({ Rating: newRateRes, numberRate: this.state.data.resNumRate + 1 });
                            // ----- Update restaurant ----------------------
                            this.setState({
                                rateVal: val,
                                rate: true,
                                data: {...this.state.data, rating:newRateFood, resRating: newRateRes, numRate: this.state.data.numRate + 1 ,  numberRate: this.state.data.resNumRate + 1  }
                            });

                    }
                }
            }
      } );
   }
}

// ===============================================
OrderSuccess()
{
     this.state.data.orderCount += 1;
     this.setState({ isOrderSuccess: true });
     setTimeout(()=>this.setState({ isOrderSuccess: false }), 7000);
}

async loadComment(storageRef, dataNav, infoAccount)
{
        let commentList = [];
        if (infoAccount)
        {
              const commentLoad = await firebase.firestore().collection("Comment").where("UID", "==", infoAccount.id).where("Reply", "==", false).where("FoodID", "==", dataNav.id).limit(6).get();
              commentLoad.forEach(
                  (item)=>{
                      const i = {
                            CommentID: item.id,
                            UID: item.data().UID,
                            Time: item.data().Time,
                            Content: item.data().Content,
                            numberOfLikes: item.data().numberOfLikes,
                            numberOfReply: item.data().numberOfReply
                      };
                      commentList.push(i);
                      this.setState({ commentList: commentList });
                      console.log("Outer: ", this.state.commentList);
                  }
              );
        }
             const commentLoadNew = await firebase.firestore().collection("Comment").where("Reply", "==", false).where("FoodID", "==", dataNav.id).limit(7).get();
             commentLoadNew.forEach(
                 (item)=>{
                    if (commentList.length < 6 && commentList.findIndex(i => i.CommentID == item.id) == -1)
                    {
                         const i = {
                               CommentID: item.id,
                               UID: item.data().UID,
                               Time: item.data().Time,
                               Content: item.data().Content,
                               numberOfLikes: item.data().numberOfLikes,
                               numberOfReply: item.data().numberOfReply
                         };
                         commentList.push(i);
                         this.setState({ commentList: commentList });
                     }
                 });
}


async loadingSimilarFood(infoFood, storageRef, dataNav)
{
          let similarFood = []
          const similar = await firebase.firestore().collection("Food").where("isDeleted", "==", false).where("TypeOfFood", "==", infoFood.data().TypeOfFood).limit(6).get();
          similar.forEach(
            (i)=>{
                  const item = {
                                    key: ' ',
                                    id: i.id,
                                    title: i.data().Name,
                                    resID: i.data().ID_RES,
                                    price: i.data().Price,
                                    rate: i.data().rating
                               };
                 if (item.id != dataNav.id) { similarFood.push(item);}
             });
          this.setState({ similar: similarFood, similarLoading: false });
}
  // ===============================================================================================================
async componentDidMount()
  {
        // ====== Get Data Food Information ============================================================================
         const storageRef = firebase.storage().ref();
         const dataNav = this.props.navigation.getParam("data");
         const infoFood = await firebase.firestore().collection("Food").doc(dataNav.id).get();
         const infoRes = await firebase.firestore().collection("Restaurants").doc(infoFood.data().ID_RES).get();
         this.setState({data:
             {
                  foodID: dataNav.id,
                  image: " ",
                  name: infoFood.data().Name,
                  price: infoFood.data().Price,
                  state: infoFood.data().State,
                  rating: Number(infoFood.data().rating),
                  info: infoFood.data().Information,
                  resName: infoRes.data().NameRES,
                  resAddress: infoRes.data().Address,
                  orderCount: infoRes.data().Ordercount,
                  resRating: Number(infoRes.data().Rating),
                  feedBack: infoRes.data().FeedBack,
                  resID: infoRes.id,
                  numRate: infoFood.data().numRate,
                  resNumRate: infoRes.data().numberRate,
             },
             loading: false,
             isDeleted: infoFood.data().isDeleted
         });
         firebase.storage().ref().child("/FoodImage/" + dataNav.id + ".jpg").getDownloadURL().then(url=>{
               this.setState({ data: {...this.state.data, image: url} });
         });
         // ==== Get Similar Food ======================================================================================
          this.loadingSimilarFood(infoFood, storageRef, dataNav);
         // ======= Check if customer / restaurant like this food =====================================================================================================
         let infoAccount = null;
         if (firebase.auth().currentUser)
         {
               infoAccount =  await this.ref.get();
               const isLiked = !(infoAccount.data().likeFood.indexOf( dataNav.id ) === -1);
               // ===== Check user is rating or not ========================================================================================================================
               const isRated = !(infoAccount.data().rating.indexOf( dataNav.id ) === -1);
               let rateVal = 0;
               if (isRated)
                     rateVal = Number(infoAccount.data().rating.substr( infoAccount.data().rating.indexOf( dataNav.id ) + 21, 1));
              this.setState({ like: isLiked, rate: isRated, rateVal: rateVal });
              // ===== Load comment about food ============================================================================================================================
          }
          this.loadComment(storageRef, dataNav, infoAccount);
  }

  updateNewComment(item)
   {
        let comment = this.state.commentList;
        comment.push(item);
        this.setState({ commentList: comment });
   }

  render()
  {
    //------- Message ----------------------------------------------------------------
    const message = (this.state.showMessage ? <Message text={this.state.message} /> : null );
    let myNotification;
    if (this.state.isOrderSuccess)
    {
          myNotification = <Message
                                      text={ "Thank you" }
                                      round={5}
                                      backgroundColor="#00BFA5"
                                      color="white"
                                      textStyle={{ fontSize: 20, lineHeight: 24, fontWeight: "bold"}}
                                      secondText={
                                            <Text style={{color: "white", paddingBottom: 10, paddingLeft: 20}}>Your order is sent successfully.</Text>
                                          }
                                      top="15%"
                                      icon={{color: "white", name: "checkcircle", type: "antdesign", onPress: null, size: 50}}
                                />;
    }
    // ------ Number and date format--------------------------------------------------
    if ( Platform.OS === 'android' ) {
            require('intl');
            require('intl/locale-data/jsonp/en');
    }
    const isSameRes = firebase.auth().currentUser && firebase.auth().currentUser.uid == this.state.data.resID;
    const info = (<View style={detailFood.foodInfor} >
             <Image
                 source={{uri: this.state.data.image }}   /*  This must be data from main-screen */
                 style={ detailFood.image }
                 resizeMode='cover'
             />
             <View style={ detailFood.titleAndPrice }>
                     <Text style={detailFood.title}>{ this.state.data.name }</Text>
                     <View style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderBottomWidth: 1, borderBottomColor: "rgba(0, 0, 0, 0.2)", width: "100%", padding: 5, marginBottom: 5}}>
                           <Text style={detailFood.price}> { new Intl.NumberFormat('en').format(this.state.data.price)  + " đ"} </Text>
                           <View style={{width: "20%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row", borderRadius: 40, backgroundColor: "#227100", padding: 5, marginRight: 20, paddingHorizontal: 10}}>
                                   <Icon name="star" type="antdesign" color="white" size={15} />
                                   <Text style={{color: "white", fontSize: 14, marginLeft: 10}}>{ this.state.data.rating }</Text>
                           </View>
                           { ( isSameRes || this.state.isDeleted ? null :
                           <RoundButton
                                 text="ORDER"
                                 textColor="white"
                                 background="#227100"
                                 boxStyle={{width: "30%", marginHorizontal: 10}}
                                 round={5}
                                 underlayColor="#227110"
                                 textStyle={{fontSize: 16, paddingVertical: 0, paddingHorizontal: 5}}
                                 handleOnPress={ ()=>{ this.props.navigation.push("Order", {data: {image: this.state.data.image,
                                                                                                   title: this.state.data.name,
                                                                                                   price: this.state.data.price,
                                                                                                   resID: this.state.data.resID,
                                                                                                   foodID: this.state.data.foodID,
                                                                                                   message: this.OrderSuccess,
                                                                                                   ordercount: this.state.data.orderCount}} ); } }
                           />
                         )}
                     </View>
             </View>
             {(this.state.isDeleted ?
                    <View style={ detailFood.statusFood }>
                          <View style={ [detailFood.wrapperItemStatus, {width: "90%"}] }>
                                <Icon type="entypo" name="circle-with-cross" size={15} color="red" />
                                <Text style={ [detailFood.textOnStatus, {color: "red"}] }>Món ăn đã không còn trong thực đơn của nhà hàng</Text>
                          </View>
                    </View>
               : <View style={ detailFood.statusFood }>
                 <View style={ detailFood.wrapperItemStatus }>
                       <Icon type="font-awesome" name="shopping-bag" size={15} color="#227100" />
                       <Text style={ detailFood.textOnStatus }>Còn hàng</Text>
                 </View>
                 <View style={ detailFood.wrapperItemStatus }>
                     <Icon type="antdesign" name="checkcircle" size={15} color="#227100" />
                     <Text style={ detailFood.textOnStatus }>Chính hãng</Text>
                 </View>
             </View> )}
         </View>);

    const load =  (<View style={detailFood.foodInfor} >
                          <ContentLoader
                                 height={ detailFood.cantLoading.height }
                                 width={ detailFood.cantLoading.width } >
                              <Rect x="5%" y="0" rx="10" ry="10" width="90%" height="70%" />
                              <Rect x="5%" y="75%" rx="10" ry="10" width="90%" height="5%" />
                              <Rect x="5%" y="84%" rx="10" ry="10" width="50%" height="5%" />
                              <Rect x="60%" y="84%" rx="10" ry="10" width="35%" height="5%" />
                              <Rect x="5%" y="93%" rx="10" ry="10" width="35%" height="5%" />
                              <Rect x="45%" y="93%" rx="10" ry="10" width="50%" height="5%" />
                          </ContentLoader>
                  </View>);

    return (
    <View style={{flex: 1}}>
      {myNotification}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ width: "100%", height: "100%" }}>
              { (this.state.loading ? load : info) }
          {( this.state.user && !this.state.isDeleted ?
          <ComponentWithTitle
                title="Rating and like"
                dataStyle={{width: "100%"}}
                data={
                  <View style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row",  padding: 5}}>
                    <RoundButton
                          text= { (this.state.like ? "Liked" : "Like" ) }  /*   Like or Liked  */
                          background={ "transparent" }
                          /*  background-color must depend on whether like or haven't yet  */
                          textColor={ (this.state.like ? "#0078D7" : "gray" ) }
                          round={5}
                          /*   icon must depend on whether like or haven't yet    */
                          boxStyle={{borderColor: (this.state.like ? "#0078D7" : "gray" ), borderWidth: 1, width: "30%", marginRight: "15%", marginLeft: -20}}
                          handleOnPress={ this.like }
                          /* Function handler when like food -- update db */
                     />
                    <AirbnbRating
                          style={{width: "65%", fontSize: 16}}
                          count={5}
                          size={20}
                          reviews={["Terrible", "Bad", "Medium", "Good", "Great"]}
                          onFinishRating={ this.rating }
                          defaultRating={ this.state.rateVal }
                          /* Function handle when rating */
                    />
                 </View>
                }
           /> : null )}


       <ComponentWithTitle
            title="Restaurant Information"
            dataStyle={{width: "90%"}}
            data={
               <View style={ resInfor.wrapper }>
                  <View style={ resInfor.banner }>
                        <View style={ [resInfor.name, {width: (isSameRes ? "100%" : "65%") }] }>
                              <Avatar
                                  size="small"
                                  rounded
                                  icon={{type: "evilicon", name: "user", color: "white"}}
                                  containerStyle={{}}
                              />
                              <View style={{width: "80%"}}>
                                    <Text style={{ fontWeight: "bold", fontSize: 14, width: "100%", padding: 5, marginLeft: 14}}>{ this.state.data.resName }</Text>
                                    <View style={ resInfor.locate } >
                                        <Icon
                                              type="material"
                                              name="place"
                                              color="gray"
                                              size={15}
                                        />

                                        <Text style={{ fontSize: 12, paddingLeft: 5, width: "90%"}}>{ this.state.data.resAddress }</Text>
                                    </View>
                              </View>
                        </View>
                         { ( isSameRes ? null :
                        <RoundButton
                              text="Visit"
                              textColor="#227100"
                              background="white"
                              textStyle={{fontSize: 14, padding: 5}}
                              round={40}
                              boxStyle={{ borderWidth: 1, borderColor: "#227100", width: "33%"}}
                              handleOnPress={ ()=>{ this.props.navigation.push("Infor", {data: {resID: this.state.data.resID,
                                                                                                message: this.OrderSuccess,
                                                                                                }} ); } }
                              underlayColor="#F2FDE0"
                        /> )}
                  </View>
                  <View style={ resInfor.statistics }>
                      <View style={ resInfor.statisticsWrapper }>
                            <Text style={ resInfor.firstText }>{ this.state.data.orderCount }</Text>
                            <Text style={ resInfor.secondText }>Đơn hàng</Text>
                      </View>
                      <View style={ resInfor.statisticsWrapper }>
                            <Text style={ resInfor.firstText }>{ this.state.data.resRating }</Text>
                            <Text style={ resInfor.secondText }>Đánh giá</Text>
                      </View>
                      <View style={ resInfor.statisticsWrapper } >
                            <Text style={ resInfor.firstText }>{ this.state.data.feedBack + "%" }</Text>
                            <Text style={ resInfor.secondText }>Phản hồi</Text>
                      </View>
                  </View>
             </View>
           }
         />

        <ComponentWithTitle
                  title="Food information"
                  dataStyle={{width: "90%"}}
                  data={
                            <Text style={{width: "100%", fontSize: 14, textAlign: 'justify'}}>
                                    { this.state.data.info }
                            </Text>
                       }
          />

        <ComponentWithTitle
                    title="Comments"
                    sndText="See more >"
                    containerStyle={{marginBottom: 20, backgroundColor: "white"}}
                    data={
                              <View style={{width: "100%"}}>
                                    {(
                                          (this.state.commentList.length == 0)  ?
                                                  <Text style={{width: "100%", textAlign: "center", fontWeight: "bold", fontSize: 18, padding: 10}}>There is no comments.</Text>
                                          : this.state.commentList.map((i, id)=><Comment
                                                                                      key={id}
                                                                                      content={i.Content}
                                                                                      commentID={i.CommentID}
                                                                                      UID={i.UID}
                                                                                      time={i.Time}
                                                                                      numberOfReply={i.numberOfReply}
                                                                                      numberOfLikes={i.numberOfLikes}
                                                                                      foodID = {this.props.navigation.getParam("data").id}
                                                                                      isDeleted={this.state.isDeleted}
                                                                            />)

                                    )}

                                    {( this.state.user && !this.state.isDeleted ?
                                     <CommentInput
                                            foodID = {this.props.navigation.getParam("data").id}
                                            UID = { (firebase.auth().currentUser ? firebase.auth().currentUser.uid : 0) }
                                            update={ this.updateNewComment }
                                      /> : null )}
                              </View>
                         }
         />

        <ListView
              title="Similar Foods"
              containerStyle={{ shadowColor: 'black', shadowOpacity: 0.3, elevation: 3 }}
              navigation = { this.props.navigation }
              routename={ "Detail" }
              data = { this.state.similar }
              loading = { this.state.similarLoading }
        />
        </View>
      </ScrollView>
      { message }
    </View>
    );
  }
}
