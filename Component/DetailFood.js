import React, { Component } from "react";
import { Text, View, Image, ScrollView, TouchableOpacity, Platform } from "react-native";
import { Rating, Avatar, AirbnbRating, Icon, Input  } from "react-native-elements";
import ComponentWithTitle from "./ComponentWithTitle";
import RoundButton from "./roundButton";
import Anchor from "./anchor";
import ListView from "./ListView";
import { detailFood, commentStyle, listViewStyle, resInfor, accountStyle } from "../Style/style";



class Comment extends Component
{
  constructor(props)
  {
        super(props);
        this.state = { liked: false };
        this.like = this.like.bind(this);
  }

  like()
  {
    this.setState({ ...this.state, liked: !this.state.liked})
    /* Cap nhat danh sach ng like */
  }

  render()
  {
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
                            <Text style={ commentStyle.nameText }>Name of account</Text>
                            <View style={ commentStyle.time }>
                                  <Icon
                                        name="md-time"
                                        type="ionicon"
                                        size={15}
                                        color="gray"
                                  />
                                  <Text style={ commentStyle.timeText }>05-Apr-19 14:03</Text>
                            </View>
                     </View>

                    <View style={ commentStyle.anchorWrapper }>
                            <Icon
                                  name="like1"
                                  type="antdesign"
                                  color={ (this.state.liked ? "#2089DC" : "gray" )}  /* change color when liked */
                                  onPress = { this.like }
                            />
                            <Icon
                                  type="entypo"
                                  name="chat"
                                  color="gray"
                                  underlayColor="transparent" //#85776E

                                  onPress={ ()=>{} }
                            />
                    </View>
                </View>
                <Text style={ commentStyle.content }>This is the content of comment</Text>
        </View>
    );
  }
}

class CommentInput extends Component
{
  constructor(props)
  {
    super(props);
    this.state = { content: "" , color: "rgba(0, 0, 0, 0.2)", width: 1 }
  }
  render()
  {
    return(
          <View style={ commentStyle.inputWrapper } >
              <Avatar
                      size="small"
                      rounded
                      icon={{type: "evilicon", name: "user", color: "white"}}
                      containerStyle={{}}
              />
                <Input
                    placeholder="Comment here..."
                    inputStyle={{fontSize: 14, color:"gray", paddingVertical: 0}}
                    onChangeText={(text) => this.setState({ ...this.state, content: text})}
                    value={this.state.content}
                    inputContainerStyle={{  borderWidth: this.state.width, borderRadius: 20, borderColor:  this.state.color, paddingHorizontal: 5, paddingVertical: 0, width: "90%"}}
                    rightIcon={{type: "ionicon", name: "md-send", color: (this.state.content === "" ? "gray" :  "#2089DC")}}
                    multiline
                    onFocus={ ()=> this.setState({ ...this.state, color: "#2089DC"}) }
                    onBlur={ ()=> this.setState({ ...this.state, color: "rgba(0, 0, 0, 0.2)"}) }
                 />

          </View>
    );
  }
}


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
      like: false   // Lay du lieu tu db
     }
     this.like = this.like.bind(this);
  }

  like() { this.setState({...this.state, like: !this.state.like}); }
  render()
  {
    if ( Platform.OS === 'android' ) {
            require('intl');
            require('intl/locale-data/jsonp/en');
    }

    const data = this.props.navigation.getParam("data");
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ width: "100%", height: "100%" }}>
          <View style={detailFood.foodInfor} >
              <Image
                  source={ data.key }   /*  This must be data from main-screen */
                  style={ detailFood.image }
              />
              <View style={ detailFood.titleAndPrice }>
                      <Text style={detailFood.title}>{ data.title }</Text>
                      <View style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderBottomWidth: 1, borderBottomColor: "rgba(0, 0, 0, 0.2)", width: "100%", padding: 5, marginBottom: 5}}>
                            <Text style={detailFood.price}> { new Intl.NumberFormat('en').format(data.price)  + " đ"} </Text>
                            <View style={{width: "20%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row", borderRadius: 40, backgroundColor: "#227100", padding: 5, marginRight: 20, paddingHorizontal: 10}}>
                                    <Icon name="star" type="antdesign" color="white" size={15} />
                                    <Text style={{color: "white", fontSize: 14, marginLeft: 10}}>{ data.rate }</Text>
                            </View>
                            <RoundButton
                                  text="ORDER"
                                  textColor="white"
                                  background="#227100"
                                  boxStyle={{width: "30%", marginHorizontal: 10}}
                                  round={5}
                                  underlayColor="#227110"
                                  textStyle={{fontSize: 16, paddingVertical: 0, paddingHorizontal: 5}}
                                  handleOnPress={ ()=>{ this.props.navigation.push("Order", {data: data} ); } }
                            />
                      </View>
              </View>
              <View style={ detailFood.statusFood }>
                  <View style={ detailFood.wrapperItemStatus }>
                        <Icon type="font-awesome" name="shopping-bag" size={15} color="#227100" />
                        <Text style={ detailFood.textOnStatus }>Còn hàng</Text>
                  </View>
                  <View style={ detailFood.wrapperItemStatus }>
                      <Icon type="antdesign" name="checkcircle" size={15} color="#227100" />
                      <Text style={ detailFood.textOnStatus }>Chính hãng</Text>
                  </View>
              </View>
          </View>



          <ComponentWithTitle
                title="Rating and like"
                dataStyle={{width: "100%"}}
                data={
                  <View style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row",  padding: 5}}>
                    <RoundButton
                          text= { (this.state.like ? "Liked" : "Like" ) }  /*   Like or Liked  */
                          background="transparent"
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
                          onFinishRating={ ()=> {} }
                          /* Function handle when rating */
                    />
                 </View>
                }
           />


       <ComponentWithTitle
            title="Restaurant Information"
            dataStyle={{width: "90%"}}
            data={
               <View style={ resInfor.wrapper }>
                  <View style={ resInfor.banner }>
                        <View style={ resInfor.name }>
                              <Avatar
                                  size="small"
                                  rounded
                                  icon={{type: "evilicon", name: "user", color: "white"}}
                                  containerStyle={{}}
                              />
                              <View>
                                    <Text style={{ fontWeight: "bold", fontSize: 14, width: "100%", padding: 5, marginLeft: 14}}>Name of restaurant</Text>
                                    <View style={ resInfor.locate } >
                                        <Icon
                                              type="material"
                                              name="place"
                                              color="gray"
                                              size={15}
                                        />
                                        <Text style={{ fontSize: 12, paddingLeft: 5}}>Address of restaurant</Text>
                                    </View>
                              </View>
                        </View>
                        <RoundButton
                              text="Visit"
                              textColor="#227100"
                              background="white"
                              textStyle={{fontSize: 14, padding: 5}}
                              round={40}
                              boxStyle={{ borderWidth: 1, borderColor: "#227100", width: "33%"}}
                              handleOnPress={ ()=>{ this.props.navigation.push("Infor"); } }
                              underlayColor="#F2FDE0"
                        />
                  </View>
                  <View style={ resInfor.statistics }>
                      <View style={ resInfor.statisticsWrapper }>
                            <Text style={ resInfor.firstText }>400</Text>
                            <Text style={ resInfor.secondText }>Đơn hàng</Text>
                      </View>
                      <View style={ resInfor.statisticsWrapper }>
                            <Text style={ resInfor.firstText }>4.9</Text>
                            <Text style={ resInfor.secondText }>Đánh giá</Text>
                      </View>
                      <View style={ resInfor.statisticsWrapper } >
                            <Text style={ resInfor.firstText }>90%</Text>
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
                                  Food is any substance consumed to provide nutritional support for an organism. It is usually of plant or animal origin, and contains essential nutrients, such as carbohydrates, fats, proteins, vitamins, or minerals. The substance is ingested by an organism and assimilated by the organism's cells to provide energy, maintain life, or stimulate growth.
                                  Historically, humans secured food through two methods: hunting and gathering and agriculture. Today, the majority of the food energy required by the ever increasing population of the world is supplied by the food industry.
                                  Food safety and food security are monitored by agencies like the International Association for Food Protection, World Resources Institute, World Food Programme, Food and Agriculture Organization, and International Food Information Council. They address issues such as sustainability, biological diversity, climate change, nutritional economics, population growth, water supply, and access to food.
                           </Text>
                       }
          />

        <ComponentWithTitle
                    title="Comments"
                    sndText="See more >"
                    containerStyle={{marginBottom: 20, backgroundColor: "white"}}
                    data={
                              <View style={{width: "100%"}}>
                                    <Comment />
                                    <Comment />
                                    <Comment />
                                    <CommentInput />
                              </View>
                         }
         />

        <ListView
              title="Similar Foods"
              containerStyle={{ shadowColor: 'black', shadowOpacity: 0.3, elevation: 3,}}
              navigation = { this.props.navigation }
              routename={ "Detail" }
        />

        </View>
      </ScrollView>
    );
  }
}
