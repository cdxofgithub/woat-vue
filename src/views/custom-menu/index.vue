<template>
  <div class="custom-menu-container">
    <div class="custom-menu-tit">
      自定义菜单
    </div>
    <div class="custom-menu-wrap">
      <div class="menu-box f_l_c">
        <div class="menu-box-left rm">
          <div class="menu-box-left-bottom em f_l_c">
            <div
              v-for="(item, index) in menuItems"
              :key="index"
              class="menu-item f_c_c rm"
              :class="item.isActive ? 'active' : ''"
              @click="chooseMenu(index)"
            >
              <i
                v-if="item.isAdd"
                class="add"
              /> {{ item.name }}
              <div
                v-if="item.itemsShow"
                class="childrens em"
              >
                <div
                  v-for="(item1, index1) in item.items"
                  :key="index1"
                  class="children-wrap"
                  :class="item1.isActive ? 'active' : ''"
                  @click.stop="chosseItem(index, index1)"
                >
                  <div class="children f_c_c">
                    <i
                      v-if="item1.isAdd"
                      class="add-1"
                    />
                    <span>{{ item1.name }}</span>
                  </div>
                </div>
                <div class="arrow em" />
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="menuItems.length > 1 && isShowRight"
          class="menu-box-right rm"
        >
          <i class="arrow em" />
          <div class="menu-box-right-tit f_b_c">
            <span>{{
              currItem || currItem == 0 ? "子菜单名称" : "菜单名称"
            }}</span>
            <span
              class="del"
              @click="delItem"
            >{{
              currItem || currItem == 0 ? "删除子菜单" : "删除菜单"
            }}</span>
          </div>
          <div class="menu-box-right-name m_t30_b10">
            <div class="f_l_c">
              <span class="text-name">{{
                currItem || currItem == 0 ? "子菜单名称" : "菜单名称"
              }}</span>
              <el-input
                v-model="name"
                class="text-input"
                placeholder="菜单名称"
                clearable
                size="small"
                @input="nameChange"
              />
            </div>
            <div class="desc">
              仅支持中英文和数字，字数不超过4个汉字或8个字母
            </div>
          </div>
          <div
            v-if="
              currItem || currItem == 0 || menuItems[currMenu].items.length == 1
            "
            class="menu-box-right-content m_t30_b10"
          >
            <span class="text-name">{{
              currItem || currItem == 0 ? "子菜单内容" : "菜单内容"
            }}</span>
            <el-radio-group
              v-model="radio"
              fill="#07c160"
            >
              <el-radio :label="1">
                发送消息
              </el-radio>
              <el-radio :label="2">
                跳转网页
              </el-radio>
              <el-radio :label="3">
                跳转小程序
              </el-radio>
            </el-radio-group>
          </div>
          <div
            v-if="
              currItem || currItem == 0 || menuItems[currMenu].items.length == 1
            "
            class="menu-box-right-tabs"
          >
            <div
              v-if="radio == 1"
              class="tabs-1"
            >
              <el-tabs
                v-model="tabName"
                type="border-card"
                @tab-click="tabClick"
              >
                <el-tab-pane>
                  <span slot="label"><i class="el-icon-date" /> 图文消息</span>
                  <div class="tab f_c_c">
                    <div class="tab-item f_c_c_c">
                      <i class="tab-img tab-img-1" />
                      <span>从素材库选择</span>
                    </div>
                    <div class="tab-item f_c_c_c">
                      <i class="tab-img tab-img-2" />
                      <span>自建图文</span>
                    </div>
                    <div class="tab-item f_c_c_c">
                      <i class="tab-img tab-img-3" />
                      <span>转载文章</span>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane>
                  <span slot="label"><i class="el-icon-date" /> 文字</span>
                  <div class="tab rm">
                    <el-input
                      v-model="textarea"
                      type="textarea"
                      :rows="8"
                      resize="none"
                      placeholder="请输入内容"
                    />
                    <div class="surplus-num em">
                      还可以输入{{ surplusNum }}字
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane>
                  <span slot="label"><i class="el-icon-date" /> 图片</span>
                  <div class="tab f_c_c">
                    <div class="tab-item f_c_c_c">
                      <i class="tab-img tab-img-1" />
                      <span>从素材库选择</span>
                    </div>
                    <el-upload
                      action=""
                      :show-file-list="showFileList"
                      @on-success="uploadScuuess"
                    >
                      <div class="tab-item f_c_c_c rm">
                        <i class="tab-img tab-img-4" />
                        <span>上传图片</span>
                      </div>
                    </el-upload>
                  </div>
                </el-tab-pane>
                <el-tab-pane>
                  <span slot="label"><i class="el-icon-date" /> 卡券</span>
                  卡券
                </el-tab-pane>
                <el-tab-pane>
                  <span slot="label"><i class="el-icon-date" /> 音频</span>
                  <div class="tab f_c_c">
                    <div class="tab-item f_c_c_c">
                      <i class="tab-img tab-img-1" />
                      <span>从素材库选择</span>
                    </div>
                    <div class="tab-item f_c_c_c">
                      <i class="tab-img tab-img-5" />
                      <span>上传音频</span>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane>
                  <span slot="label"><i class="el-icon-date" /> 视频</span>
                  <div class="tab f_c_c">
                    <div class="tab-item f_c_c_c">
                      <i class="tab-img tab-img-1" />
                      <span>从素材库选择</span>
                    </div>
                    <div class="tab-item f_c_c_c">
                      <i class="tab-img tab-img-6" />
                      <span>上传视频</span>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
            <div
              v-if="radio == 2"
              class="tabs-2"
            >
              <div class="desc">
                订阅者点击该子菜单会跳到以下链接
              </div>
              <div class="f_l_c">
                <span class="text-name">页面地址</span>
                <el-input
                  v-model="address"
                  class="text-input"
                  placeholder=""
                  size="small"
                  clearable
                />
              </div>
              <div class="desc-1">
                从公众号图文消息中选择
              </div>
            </div>
            <div
              v-if="radio == 3"
              class="tabs-3"
            >
              <div class="desc">
                订阅者点击该子菜单会跳到以下小程序
              </div>
              <div
                class="f_l_c"
                style="margin-bottom: 20px"
              >
                <span class="text-name">小程序</span>
                <el-button size="small">
                  选择小程序
                </el-button>
              </div>
              <div class="f_l_c">
                <span class="text-name">备用网页</span>
                <el-input
                  v-model="address1"
                  class="text-input"
                  placeholder=""
                  size="small"
                  clearable
                />
              </div>
              <div class="desc-2">
                旧版微信客户端无法支持小程序，用户点击菜单时将会打开备用网页。
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="menuItems.length > 1"
        class="menu-btns f_c_c"
      >
        <div class="btn btns-save f_c_c">
          保存并发布
        </div>
        <div
          class="btn btns-preview f_c_c"
          @click="toPreview"
        >
          预览
        </div>
      </div>
    </div>
    <div
      v-if="isPreview"
      class="custom-menu-preview f_c_c_c"
    >
      <div class="preview-bg rm">
        <img
          src="../../assets/custom-menu/preview.png"
          alt=""
        >
        <div class="menu-box-left-bottom em f_l_c">
          <div
            v-for="(item, index) in previewMenuItems"
            :key="index"
            class="menu-item f_c_c rm"
            :class="item.isActive ? 'active' : ''"
            @click="previewMenu(index)"
          >
            <i class="mark" /> {{ item.name }}
            <div
              v-if="item.itemsShow && item.items.length"
              class="childrens em"
            >
              <div
                v-for="(item1, index1) in item.items"
                :key="index1"
                class="children-wrap"
                :class="item1.isActive ? 'active' : ''"
                @click.stop="previewItem(index, index1)"
              >
                <div class="children f_c_c">
                  <i
                    v-if="item1.isAdd"
                    class="add-1"
                  />
                  <span>{{ item1.name }}</span>
                </div>
              </div>
              <div class="arrow em" />
            </div>
          </div>
        </div>
      </div>
      <div
        class="preview-btn"
        @click="toPreview"
      >
        退出预览
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuItems: [
        {
          name: "添加菜单",
          isActive: true,
          isAdd: true,
          itemsShow: false,
          items: [
            {
              name: "",
              isAdd: true,
              isActive: false
            }
          ]
        }
      ],
      previewMenuItems: [],
      isShowRight: true, //右边是否显示
      name: "", //菜单 / 子菜单名称
      textarea: "", //文字消息
      address: "", //跳转网页地址
      address1: "", //跳转小程序备用网页地址
      currMenu: 0, //当前底部菜单项索引
      currItem: 0, //当前底部菜单列表项索引
      radio: 1, //菜单内容
      tabName: "0", //菜单内容->发送消息->面板切换
      surplusNum: 300, //剩余可以输入字数
      isPreview: false, //是否打开预览
      showFileList: false
    };
  },
  watch: {
    currMenu() {
      this.resetParam();
    },
    currItem() {
      this.resetParam();
    }
  },
  methods: {
    uploadScuuess(res, file, fileList) {
      console.log(res)
      console.log(file)
      console.log(fileList)
    },
    //点击底部菜单
    chooseMenu(index) {
      this.currMenu = index;
      this.currItem = null;
      this.isShowRight = true;
      let menuItems = this.menuItems;

      //清空menu下所有高亮和隐藏items
      menuItems.forEach(item => {
        item.itemsShow = false;
        item.isActive = false;
      });

      //清除当前menu下所有item的高亮
      let items = menuItems[index].items;
      items.forEach(item => {
        item.isActive = false;
      });

      //打开当前menu的高亮和items
      menuItems[index].itemsShow = true;
      menuItems[index].isActive = true;

      //判断能否添加
      if (menuItems[index].isAdd) {
        menuItems[index].isAdd = false;
        menuItems[index].name = "菜单名称";
        if (index < 2) {
          menuItems.push({
            name: "",
            isActive: false,
            isAdd: true,
            itemsShow: false,
            items: [
              {
                name: "",
                isAdd: true,
                isActive: false
              }
            ]
          });
        }
      }

      //填充input内容
      this.name = menuItems[index].name;
    },
    //点击底部菜单的展开项
    chosseItem(index1, index2) {
      this.currMenu = index1;
      this.currItem = index2;
      this.menuItems[index1].isActive = false;
      let items = this.menuItems[index1].items;
      items.forEach(item => {
        item.isActive = false;
      });
      items[index2].isActive = true;
      if (items[index2].isAdd) {
        items[index2].isAdd = false;
        items[index2].name = "子菜单名称";
        if (index2 < 4) {
          items.push({
            isAdd: true,
            isActive: false,
            name: ""
          });
        }
      }
      //填充input内容
      this.name = items[index2].name;
    },
    //删除菜单
    delItem() {
      if (this.currItem || this.currItem == 0) {
        let items = this.menuItems[this.currMenu].items;
        let isHaveAdd = false;
        items.forEach(item => {
          if (item.isAdd) {
            isHaveAdd = true;
          }
        });
        items.splice(this.currItem, 1);
        if (!isHaveAdd) {
          items.push({
            isAdd: true,
            isActive: false,
            name: ""
          });
        }
      } else {
        this.delMenu();
      }
      this.hideItem();
    },
    delMenu() {
      this.menuItems.splice(this.currMenu, 1);
      let isHaveAdd = false;
      this.menuItems.forEach(item => {
        if (item.isAdd) {
          isHaveAdd = true;
        }
      });
      if (!isHaveAdd) {
        this.menuItems.push({
          name: "",
          isActive: false,
          isAdd: true,
          itemsShow: false,
          items: [
            {
              name: "",
              isAdd: true,
              isActive: false
            }
          ]
        });
      }
    },
    //重置相关参数
    resetParam() {
      this.radio = 1;
      this.tabName = "0";
    },
    //隐藏右边，子菜单隐藏
    hideItem() {
      this.isShowRight = false;
      this.menuItems.forEach(item => {
        item.itemsShow = false;
      });
    },
    tabClick() {},
    nameChange() {
      this.name = this.cutCharts(this.name);
      let menu = this.menuItems[this.currMenu];
      if (this.currItem || this.currItem == 0) {
        menu.items[this.currItem].name = this.name;
      } else {
        menu.name = this.name;
      }
    },
    //超过4个汉子或者8个字符阻止写入
    cutCharts(name) {
      let nameLength = 0;
      let cutIndex = 0;
      for (let i = 0; i < name.length; i++) {
        if (escape(name[i]).indexOf("%u") < 0) {
          //不是中文
          nameLength += 1;
        } else {
          //中文
          nameLength += 2;
        }
        if (nameLength > 8) {
          cutIndex = i;
          break;
        }
      }
      if (nameLength <= 8) {
        cutIndex = name.length;
      }
      return name.slice(0, cutIndex);
    },
    toPreview() {
      let menuItems = JSON.parse(JSON.stringify(this.menuItems)); //深拷贝
      let previewMenuItems = [];
      menuItems.forEach(item => {
        if (item.name) {
          item.itemsShow = false;
          let previewItems = [];
          item.items.forEach(e => {
            if (e.name) {
              previewItems.push(e);
            }
            item.items = previewItems;
          });
          previewMenuItems.push(item);
        }
      });
      this.previewMenuItems = previewMenuItems;
      this.isPreview = !this.isPreview;
    },
    //预览菜单点击
    previewMenu(index) {
      this.previewMenuItems.forEach(item => {
        item.itemsShow = false;
      });
      this.previewMenuItems[index].itemsShow = true;
    },
    //预览子菜单点击
    previewItem(index, index1) {
      console.log(index, index1);
    }
  }
};
</script>

<style lang="scss" scoped>
.custom-menu {
  &-container {
    margin: 30px;
  }
  &-tit {
    font-size: 26px;
    font-weight: 400;
    line-height: 1;
    margin-bottom: 40px;
  }
  &-wrap {
    min-width: 1250px;
    background: #fff;
    padding: 40px 50px 30px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 3px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
    .menu-box {
      &-left {
        width: 320px;
        height: 580px;
        margin-right: 12px;
        background: transparent url("../../assets/custom-menu/top.png")
          no-repeat 0 0;
        background-position: 0 0;
        border: 1px solid #e7e7eb;
        &-bottom {
          width: 100%;
          height: 50px;
          bottom: 0;
          left: 0;
          right: 0;
          border-top: 1px solid #e7e7eb;
          background: transparent url("../../assets/custom-menu/bottom.png")
            no-repeat 0 0;
          background-position: 0 0;
          background-repeat: no-repeat;
          padding-left: 43px;
          box-sizing: border-box;
          .menu-item {
            flex: 1;
            height: 100%;
            font-size: 14px;
            color: #616161;
            border-left: 1px solid #e7e7eb;
            cursor: pointer;
            .add,
            .add-1 {
              width: 14px;
              height: 14px;
              margin-right: 5px;
              background: url(../../assets/custom-menu/spirit-1.png) 0 -0px no-repeat;
            }
            &.active {
              border: 1px solid #07c160;
              color: #07c160;
              .add {
                background: url(../../assets/custom-menu/spirit-1.png) 0 -18px no-repeat;
              }
            }
            .childrens {
              width: 100%;
              bottom: 60px;
              left: 0;
              background-color: #fafafa;
              border: 1px solid #d0d0d0;
              .children-wrap {
                width: 100%;
                height: 45px;
                color: #616161;
                &.active {
                  border: 1px solid #07c160;
                  color: #07c160;
                  box-sizing: border-box;
                }
                .children {
                  width: 80%;
                  height: 100%;
                  margin: 0 auto;
                  border-top: 1px solid #e7e7eb;
                  box-sizing: border-box;
                  span {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                }
                &:nth-child(1) .children {
                  border-top: 0;
                }
              }
              .arrow {
                position: absolute;
                left: 50%;
                margin-left: -6px;
                bottom: -6px;
                display: inline-block;
                width: 0;
                height: 0;
                border-width: 6px;
                border-style: solid;
                border-color: #e8e6e6 transparent transparent;
                border-bottom-width: 0;
                border-top-style: solid;
              }
            }
          }
        }
      }
      &-right {
        flex: 1;
        height: 580px;
        margin-left: 12px;
        padding: 0 20px;
        background-color: #f4f5f9;
        border: 1px solid #e7e7eb;
        color: #353535;
        font-size: 14px;

        &-tit {
          padding: 10px 0;
          border-bottom: 1px solid #e7e7eb;
        }
        &-name {
          .text-input {
            width: 228px;
          }
          .desc {
            color: #9a9a9a;
            margin-left: 90px;
            margin-top: 10px;
          }
        }
        &-tabs {
          width: 660px;
          margin-top: 20px;
          .tabs-1 {
            width: 100%;
            height: 278px;
            .el-tabs {
              height: 100%;
            }
            .tab {
              width: 100%;
              height: 210px;
              color: #9a9a9a;
              .tab-item {
                width: 130px;
                height: 130px;
                margin: 0 10px;
                cursor: pointer;
                &:hover {
                  background-color: #f6f8f9;
                }
                .tab-img {
                  display: inline-block;
                  width: 40px;
                  height: 40px;
                  margin-bottom: 6px;
                }
                .tab-img-1 {
                  background: url("../../assets/custom-menu/tab-imgs.png") 0 -44px
                    no-repeat;
                  background-size: 40px auto;
                }
                .tab-img-2 {
                  background: url("../../assets/custom-menu/tab-imgs.png") 0 0px
                    no-repeat;
                  background-size: 40px auto;
                }
                .tab-img-3 {
                  background: url("../../assets/custom-menu/tab-imgs.png") 0 -88px
                    no-repeat;
                  background-size: 40px auto;
                }
                .tab-img-4 {
                  background: url("../../assets/custom-menu/tab-imgs.png") 0 -220px
                    no-repeat;
                  background-size: 40px auto;
                }
                .tab-img-5 {
                  background: url("../../assets/custom-menu/tab-imgs.png") 0 -176px
                    no-repeat;
                  background-size: 40px auto;
                }
                .tab-img-6 {
                  background: url("../../assets/custom-menu/tab-imgs.png") 0 -132px
                    no-repeat;
                  background-size: 40px auto;
                }
              }
              .surplus-num {
                color: #9a9a9a;
                right: 10px;
                bottom: 2px;
              }
              /deep/ .el-upload:focus {
                color: #9a9a9a;
              }
            }
          }
          .tabs-2,
          .tabs-3 {
            width: 100%;
            height: 140px;
            background: #fff;
            padding: 16px 20px;
            border: 1px solid #e7e7eb;
            background-color: #fff;
            box-sizing: border-box;
            .desc {
              color: #9a9a9a;
              margin-bottom: 20px;
            }
            .text-input {
              width: 300px;
            }
            .desc-1 {
              color: #576b95;
              margin-left: 90px;
              margin-top: 10px;
              cursor: pointer;
            }
            .desc-2 {
              color: #9a9a9a;
              margin-left: 90px;
              margin-top: 10px;
            }
          }
          .tabs-3 {
            height: 190px;
          }
        }
        .arrow {
          display: inline-block;
          width: 0;
          height: 0;
          border-width: 12px;
          border-style: dashed;
          border-color: transparent;
          border-left-width: 0;
          border-right-color: #f4f5f9;
          border-right-style: solid;
          bottom: 10px;
          left: -12px;
        }
        .del {
          color: #576b95;
          cursor: pointer;
        }
        .text-name {
          display: inline-block;
          width: 80px;
          margin-right: 10px;
        }
      }
    }
    .menu-btns {
      width: 100%;
      color: #353535;
      font-size: 14px;
      margin: 50px 0 20px;
      height: 30px;
      .btn {
        padding: 0 22px;
        height: 100%;
        border-radius: 3px;
        margin: 0 10px;
        cursor: pointer;
      }
      .btns-save {
        background-color: #07c160;
        color: #fff;
        border: 1px solid #07c160;
        &:hover {
          background-color: #06ad56;
        }
      }
      .btns-preview {
        background-color: #fff;
        border: 1px solid #e7e7eb;
        &:hover {
          background-color: #e7e7eb;
          border: 1px solid #dadbe0;
        }
      }
    }
  }
  &-preview {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1001;
    .preview-bg {
      width: 327px;
      .menu-box-left-bottom {
        width: 234px;
        height: 40px;
        bottom: 93px;
        left: 65px;
        right: 0;
        border-top: 1px solid #e7e7eb;
        background-position: 0 0;
        background-repeat: no-repeat;
        box-sizing: border-box;
        .menu-item {
          flex: 1;
          height: 100%;
          font-size: 14px;
          color: #616161;
          border-left: 1px solid #e7e7eb;
          cursor: pointer;
          .mark {
            width: 7px;
            height: 7px;
            margin-right: 2px;
            background: url(../../assets/custom-menu/spirit-1.png) 0 -36px no-repeat;
          }
          .childrens {
            width: 100%;
            bottom: 50px;
            left: 0;
            background-color: #fafafa;
            border: 1px solid #d0d0d0;
            box-sizing: border-box;
            .children-wrap {
              width: 100%;
              height: 30px;
              color: #616161;
              .children {
                width: 80%;
                height: 100%;
                margin: 0 auto;
                border-top: 1px solid #e7e7eb;
                box-sizing: border-box;
                span {
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }
              &:nth-child(1) .children {
                border-top: 0;
              }
            }
            .arrow {
              position: absolute;
              left: 50%;
              margin-left: -6px;
              bottom: -6px;
              display: inline-block;
              width: 0;
              height: 0;
              border-width: 6px;
              border-style: solid;
              border-color: #ffffff transparent transparent;
              border-bottom-width: 0;
              border-top-style: solid;
            }
          }
        }
      }
    }
    .preview-btn {
      background-image: linear-gradient(to bottom, #fff 0, #fff 100%);
      border-color: #e7e7eb;
      color: #353535;
      min-width: 60px;
      padding: 0 22px;
      height: 30px;
      line-height: 30px;
      border-radius: 4px;
      margin-top: 10px;
      cursor: pointer;
      &:hover {
        background-color: #e7e7eb;
        background-image: linear-gradient(to bottom, #e7e7eb 0, #e7e7eb 100%);
        border-color: #dadbe0;
      }
    }
  }
}
</style>
