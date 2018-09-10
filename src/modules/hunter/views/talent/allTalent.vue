<template>
    <section v-loading="loading">
        <div class="searchBar">
            <el-form  size="small">
                <el-row>
                    <el-col :span="4"><div class="sh-grid-content sh-bg-left">
                        <label class="lb-left">名称：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="sh-grid-content sh-bg-right">
                        <el-input v-model="pageParams.params.lk_name" class="w-240" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                </el-row>
            </el-form>

            <el-button type="primary" icon="el-icon-search"  @click="search" size="small">搜索</el-button>
            <el-button type="primary" icon="el-icon-refresh"  @click="reset" size="small">重置</el-button>
        </div>

        <div class="tableBox">
            <div class="pageTableContent">
                <el-button type="primary" size="mini" class="addBanner" @click="add"><i class="el-icon-plus"></i>新增</el-button>
                <el-button type="danger" size="mini" class="addBanner" @click="delBatch"><i class="el-icon-delete"></i>批量删除</el-button>
                <el-button type="warning" size="mini" @click="colSetting"><i class="el-icon-setting"></i>配置列</el-button>
                <el-table :data="pageParams.data" border v-loading="loading"
                          :stripe="tableCss.stripe" size="mini"
                          border
                          :cell-style=cellStyle
                          :row-style=rowStyle
                          :header-cell-style=headerCellStyle
                          height="500"
                          max-height="520"
                          @sort-change="sortChange"
                          @selection-change="handleSelectionChange">
                    <el-table-column width="50"
                                     fixed
                                     type="selection">
                    </el-table-column>

                    <el-table-column sortable="custom" prop="type" label="类型" align="center" min-width="120">
                        <template scope="scope">
                            <span v-for="item in dictMap.TalentType" v-if="item.code==scope.row.type">{{item.name}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column sortable="custom" prop="nativePlace" label="籍贯" align="center" min-width="120">
                        <template scope="scope">
                            <span v-for="item in cityList" v-if="item.id==scope.row.nativePlace">{{item.name}}</span>
                        </template>
                    </el-table-column>


                    <el-table-column v-for="item in showsOrgin" :sortable="item.sortable" :prop="item.prop" :label="item.label" :width="item.width">
                    </el-table-column>
                    <el-table-column  label="操作" width="180" fixed="right">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" icon="el-icon-edit-outline" @click="edit(scope.row)"></el-button>
                            <el-button size="mini" type="success" icon="el-icon-view" @click="view(scope.row)"></el-button>
                            <el-button size="mini" type="danger" icon="el-icon-delete" @click="del(scope.row)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <div class="block">
            <span class="demonstration"></span>
            <el-pagination v-if="pageParams.totalRows"
                           @current-change="handleCurrentChange"
                           @size-change="handleSizeChange"
                           :current-page.sync="pageParams.page"
                           :page-sizes="[10, 20, 50, 100,200]"
                           :page-size="pageParams.pageSize"
                           layout="total,sizes,prev, pager, next, jumper"
                           :total="pageParams.totalRows">
            </el-pagination>
        </div>

        <!--配置 列数据的显示与否-->
        <el-dialog title="人才项列展示选择" :visible.sync="colSettingVisible" size="tiny"
                   @close="closeColSettingDialog" width="550px">
            <template>
                <el-transfer v-model="chShows" :data="nchShows"></el-transfer>
            </template>
            <div style="text-align: center;margin-top: 25px">
                <el-button size="mini" @click="closeColSettingDialog" icon="el-icon-circle-close-outline">取消</el-button>
                <el-button size="mini" type="primary" @click="saveColSetting" icon="el-icon-success">确定</el-button>
            </div>
        </el-dialog>




        <el-dialog title="人才信息编辑" :visible.sync="visible" size="tiny"
                   @close="closeDialog">

            <el-dialog
                    size="tiny"
                    width="30%"
                    title="城市选择"
                    :visible.sync="innerVisible"
                    append-to-body>
                <el-tree
                        class="filter-tree city-tree"
                        :data="cityTree"
                        :props="defaultProps"
                        show-checkbox
                        node-key="id"
                        ref="tree2">
                </el-tree>
                <div style="text-align: center;margin-top: 10px;margin-bottom: 10px;">
                    <el-button size="mini" @click="closeInnerDialog" icon="el-icon-circle-close-outline">取消</el-button>
                    <el-button size="mini" type="primary" @click="chooseInnerCity" icon="el-icon-success">确定</el-button>
                </div>
            </el-dialog>


            <el-dialog
                    size="tiny"
                    width="30%"
                    title="行业选择"
                    :visible.sync="innerBusinessVisible"
                    append-to-body>
                <el-tree
                        class="filter-tree city-tree"
                        :data="businessTree"
                        :props="defaultProps"
                        node-key="id"
                        show-checkbox
                        ref="businessTree">
                </el-tree>
                <div style="text-align: center;margin-top: 10px;margin-bottom: 10px;">
                    <el-button size="mini" @click="closeInnerBusinessDialog" icon="el-icon-circle-close-outline">取消</el-button>
                    <el-button size="mini" type="primary" @click="chooseInnerBusiness" icon="el-icon-success">确定</el-button>
                </div>
            </el-dialog>


            <el-dialog
                    size="tiny"
                    width="30%"
                    title="职能选择"
                    :visible.sync="innerCareerVisible"
                    append-to-body>
                <el-tree
                        class="filter-tree city-tree"
                        :data="careerTree"
                        :props="defaultProps"
                        show-checkbox
                        node-key="id"
                        ref="careerTree">
                </el-tree>
                <div style="text-align: center;margin-top: 10px;margin-bottom: 10px;">
                    <el-button size="mini" @click="closeInnerCareerDialog" icon="el-icon-circle-close-outline">取消</el-button>
                    <el-button size="mini" type="primary" @click="chooseInnerCareer" icon="el-icon-success">确定</el-button>
                </div>
            </el-dialog>



            <el-dialog
                    size="tiny"
                    width="30%"
                    title="标签选择"
                    :visible.sync="innerTagVisible"
                    append-to-body>
                <el-tree
                        class="filter-tree tag-tree"
                        :data="tagList"
                        :props="defaultProps"
                        show-checkbox
                        node-key="id"
                        ref="tag">
                </el-tree>
                <div style="text-align: center;margin-top: 10px;margin-bottom: 10px;">
                    <el-button size="mini" @click="closeInnerTagDialog" icon="el-icon-circle-close-outline">取消</el-button>
                    <el-button size="mini" type="primary" @click="chooseInnerTag" icon="el-icon-success">确定</el-button>
                </div>
            </el-dialog>



            <el-dialog
                    size="tiny"
                    width="30%"
                    title="共享选择"
                    :visible.sync="innerShareVisible"
                    append-to-body>
                <el-tree
                        class="filter-tree tag-tree"
                        :data="shareList"
                        node-key="value"
                        show-checkbox
                        :default-checked-keys="defaultShareKeys"
                        ref="shareList">
                </el-tree>
                <div style="text-align: center;margin-top: 10px;margin-bottom: 10px;">
                    <el-button size="mini" @click="closeInnerShareDialog" icon="el-icon-circle-close-outline">取消</el-button>
                    <el-button size="mini" type="primary" @click="chooseInnerShare" icon="el-icon-success">确定</el-button>
                </div>
            </el-dialog>







            <el-form  size="small">

                <el-row>
                    <el-col :span="24"><div class="grid-content bg-header">
                        <label style="float:left;">人才基本信息</label>
                    </div></el-col>
                </el-row>

                <el-form-item label="编号" class="hidden">
                    <el-input v-model="bean.id" placeholder="请输入内容" size="medium"></el-input>
                </el-form-item>

                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">人才类型：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-radio-group v-model="bean.type">
                            <el-radio v-for="item in dictMap.TalentType" :label="item.code">{{item.name}}</el-radio>
                        </el-radio-group>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">英文名称：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.engName" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                </el-row>

                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">名称：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.name" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">头像：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.avatar" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                </el-row>


                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">籍贯：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.tmpNativePlace" placeholder="请输入内容" size="medium" readonly="true"></el-input>
                        <el-button size="mini" type="primary" @click="cityChoose('nativePlace')" icon="el-icon-setting">选择</el-button>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">所在城市：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.tmpCity" placeholder="请输入内容" size="medium" readonly="true"></el-input>
                        <el-button size="mini" type="primary" @click="cityChoose('city')" icon="el-icon-setting">选择</el-button>
                    </div></el-col>
                </el-row>


                <el-row>
                    <el-col :span="3"><div class="grid-content bg-left">
                        <label class="lb-left">电话1：</label>
                    </div></el-col>
                    <el-col :span="5"><div class="grid-content bg-right">
                        <el-input v-model="bean.phone1" placeholder="请输入内容" size="medium" ></el-input>
                    </div></el-col>
                    <el-col :span="3"><div class="grid-content bg-left">
                        <label class="lb-left">电话2：</label>
                    </div></el-col>
                    <el-col :span="5"><div class="grid-content bg-right">
                        <el-input v-model="bean.phone2" placeholder="请输入内容" size="medium" ></el-input>
                    </div></el-col>
                    <el-col :span="3"><div class="grid-content bg-left">
                        <label class="lb-left">电话3：</label>
                    </div></el-col>
                    <el-col :span="5"><div class="grid-content bg-right">
                        <el-input v-model="bean.phone3" placeholder="请输入内容" size="medium" ></el-input>
                    </div></el-col>
                </el-row>


                <el-row>
                    <el-col :span="3"><div class="grid-content bg-left">
                        <label class="lb-left">邮箱1：</label>
                    </div></el-col>
                    <el-col :span="5"><div class="grid-content bg-right">
                        <el-input v-model="bean.email1" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                    <el-col :span="3"><div class="grid-content bg-left">
                        <label class="lb-left">邮箱2：</label>
                    </div></el-col>
                    <el-col :span="5"><div class="grid-content bg-right">
                        <el-input v-model="bean.email2" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                    <el-col :span="3"><div class="grid-content bg-left">
                        <label class="lb-left">邮箱3：</label>
                    </div></el-col>
                    <el-col :span="5"><div class="grid-content bg-right">
                        <el-input v-model="bean.email3" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                </el-row>




                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">行业：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.tmpBusinessName" placeholder="请输入内容" size="medium" readonly="true"></el-input>
                        <el-button size="mini" type="primary" @click="businessChoose" icon="el-icon-setting">选择</el-button>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">职能：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.tmpCareerName" placeholder="请输入内容" size="medium" readonly="true"></el-input>
                        <el-button size="mini" type="primary" @click="careerChoose" icon="el-icon-setting">选择</el-button>
                    </div></el-col>
                </el-row>



                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">性别：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-radio-group v-model="bean.gender">
                            <el-radio  :label=true>男</el-radio>
                            <el-radio  :label=false>女</el-radio>
                        </el-radio-group>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">生日：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-date-picker
                                v-model="bean.birthday"
                                type="date"
                                placeholder="请选择出生日期">
                        </el-date-picker>
                    </div></el-col>
                </el-row>



                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">婚姻状态：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-select  v-model="bean.marray" placeholder="根节点">
                            <el-option
                                    v-for="item in dictMap.MarryStatus"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code">
                            </el-option>
                        </el-select>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">qq：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.qq" placeholder="请输入内容" size="medium" ></el-input>
                    </div></el-col>
                </el-row>



                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">年薪：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.salary" placeholder="请输入内容" size="medium" ></el-input>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">意向城市：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.tmpIntentCityName" placeholder="请输入内容" size="medium" readonly="true"></el-input>
                        <el-button size="mini" type="primary" @click="cityChoose('intentCity')" icon="el-icon-setting">选择</el-button>
                    </div></el-col>
                </el-row>


                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">是否mpc：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-radio-group v-model="bean.mpc">
                            <el-radio  :label=true>是</el-radio>
                            <el-radio  :label=false>否</el-radio>
                        </el-radio-group>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">综合特质：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.quality" placeholder="请输入内容" size="medium" ></el-input>
                    </div></el-col>
                </el-row>



                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">家庭情况：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.family" placeholder="请输入内容" size="medium" ></el-input>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">求职目的：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.purpose" placeholder="请输入内容" size="medium" ></el-input>
                    </div></el-col>
                </el-row>

                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">目前薪酬：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.nowSalary" placeholder="请输入内容" size="medium" ></el-input>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">期望薪酬：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.expSalary" placeholder="请输入内容" size="medium" ></el-input>
                    </div></el-col>
                </el-row>


                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">顾问评价：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.evaluate" placeholder="请输入内容" size="medium" ></el-input>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">备注：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.remark" placeholder="请输入内容" size="medium" ></el-input>
                    </div></el-col>
                </el-row>



                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">标签：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.tmpTagsName" placeholder="请输入内容" size="medium" readonly="true"></el-input>
                        <el-button size="mini" type="primary" @click="tagChoose" icon="el-icon-setting">选择</el-button>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">共享方式：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-button size="mini" type="primary" @click="shareChoose" icon="el-icon-setting">选择</el-button>
                    </div></el-col>
                </el-row>



                <el-row>
                    <el-col :span="24"><div class="grid-content bg-header">
                        <label style="float:left;">工作经历</label>
                    </div></el-col>
                </el-row>

                <!--工作经历-->
                <div v-for="item in bean.recordWorkList" style="border: 1px solid #bdbdbd;margin: 5px 0px">
                    <el-row>
                        <el-col :span="4"><div class="grid-content bg-left">
                            <label class="lb-left">时间：</label>
                        </div></el-col>
                        <el-col :span="8"><div class="grid-content bg-right">
                            <el-date-picker
                                    v-model="item.startDate"
                                    type="date"
                                    placeholder="请选择开始日期">
                            </el-date-picker>
                            <el-date-picker
                                    v-model="item.endDate"
                                    type="date"
                                    placeholder="请选择结束日期">
                            </el-date-picker>
                        </div></el-col>
                        <el-col :span="4"><div class="grid-content bg-left">
                            <label class="lb-left">是否在职：</label>
                        </div></el-col>
                        <el-col :span="8"><div class="grid-content bg-right">
                            <el-radio-group v-model="item.onJod">
                                <el-radio  :label=true>是</el-radio>
                                <el-radio  :label=false>否</el-radio>
                            </el-radio-group>
                            <i class="el-icon-delete" style="float: right;border: 1px solid #bdbdbd" @click="delRecordWork(item)"></i>
                        </div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4"><div class="grid-content bg-left">
                            <label class="lb-left">公司名称：</label>
                        </div></el-col>
                        <el-col :span="8"><div class="grid-content bg-right">
                            <el-input v-model="item.companyName" placeholder="请输入内容" size="medium" ></el-input>
                        </div></el-col>
                        <el-col :span="4"><div class="grid-content bg-left">
                            <label class="lb-left">职务：</label>
                        </div></el-col>
                        <el-col :span="8"><div class="grid-content bg-right">
                            <el-input v-model="item.businessName" placeholder="请输入内容" size="medium" ></el-input>
                        </div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4"><div class="grid-content bg-left">
                            <label class="lb-left">备注：</label>
                        </div></el-col>
                        <el-col :span="20"><div class="grid-content bg-right">
                            <el-input v-model="item.remark" placeholder="请输入内容" size="medium" ></el-input>
                        </div></el-col>
                    </el-row>
                </div>
                <el-row>
                    <el-col :span="24"><div>
                        <el-button type="primary" icon="el-icon-circle-plus" size="mini" @click="addRecordWork">添加</el-button>
                    </div></el-col>
                </el-row>





                <el-row>
                    <el-col :span="24"><div class="grid-content bg-header">
                        <label style="float:left;">教育经历</label>
                    </div></el-col>
                </el-row>

                <!--教育经历-->
                <div v-for="item in bean.recordEducationList" style="border: 1px solid #bdbdbd;margin: 5px 0px">
                    <el-row>
                        <el-col :span="4"><div class="grid-content bg-left">
                            <label class="lb-left">时间：</label>
                        </div></el-col>
                        <el-col :span="8"><div class="grid-content bg-right">
                            <el-date-picker
                                    v-model="item.startDate"
                                    type="date"
                                    placeholder="请选择开始日期">
                            </el-date-picker>
                            <el-date-picker
                                    v-model="item.endDate"
                                    type="date"
                                    placeholder="请选择结束日期">
                            </el-date-picker>
                        </div></el-col>
                        <el-col :span="4"><div class="grid-content bg-left">
                            <label class="lb-left">在读：</label>
                        </div></el-col>
                        <el-col :span="8"><div class="grid-content bg-right">
                            <el-radio-group v-model="item.onCollege">
                                <el-radio  :label=true>是</el-radio>
                                <el-radio  :label=false>否</el-radio>
                            </el-radio-group>
                            <i class="el-icon-delete" style="float: right;border: 1px solid #bdbdbd" @click="delRecordEducation(item)"></i>
                        </div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4"><div class="grid-content bg-left">
                            <label class="lb-left">学校：</label>
                        </div></el-col>
                        <el-col :span="8"><div class="grid-content bg-right">
                            <el-input v-model="item.college" placeholder="请输入内容" size="medium" ></el-input>
                        </div></el-col>
                        <el-col :span="4"><div class="grid-content bg-left">
                            <label class="lb-left">专业：</label>
                        </div></el-col>
                        <el-col :span="8"><div class="grid-content bg-right">
                            <el-input v-model="item.major" placeholder="请输入内容" size="medium" ></el-input>
                        </div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4"><div class="grid-content bg-left">
                            <label class="lb-left">学历：</label>
                        </div></el-col>
                        <el-col :span="8"><div class="grid-content bg-right">
                            <el-select  v-model="item.education" placeholder="根节点">
                                <el-option
                                        v-for="item in dictMap.EducationLevel"
                                        :key="item.code"
                                        :label="item.name"
                                        :value="item.code">
                                </el-option>
                            </el-select>
                        </div></el-col>
                        <el-col :span="4"><div class="grid-content bg-left">
                            <label class="lb-left">备注：</label>
                        </div></el-col>
                        <el-col :span="8"><div class="grid-content bg-right">
                            <el-input v-model="item.remark" placeholder="请输入内容" size="medium" ></el-input>
                        </div></el-col>
                    </el-row>
                </div>
                <el-row>
                    <el-col :span="24"><div>
                        <el-button type="primary" icon="el-icon-circle-plus" size="mini" @click="addRecordEducation">添加</el-button>
                    </div></el-col>
                </el-row>




                <el-row>
                    <el-col :span="24"><div class="grid-content bg-header">
                        <label style="float:left;">项目经历</label>
                    </div></el-col>
                </el-row>

                <!--教育经历-->
                <div v-for="item in bean.recordProjectList" style="border: 1px solid #bdbdbd;margin: 5px 0px">
                    <el-row>
                        <el-col :span="4"><div class="grid-content bg-left">
                            <label class="lb-left">时间：</label>
                        </div></el-col>
                        <el-col :span="20"><div class="grid-content bg-right">
                            <el-date-picker
                                    v-model="item.startDate"
                                    type="date"
                                    placeholder="请选择开始日期">
                            </el-date-picker>
                            <el-date-picker
                                    v-model="item.endDate"
                                    type="date"
                                    placeholder="请选择结束日期">
                            </el-date-picker>
                            <i class="el-icon-delete" style="float: right;border: 1px solid #bdbdbd" @click="delRecordProject(item)"></i>
                        </div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4"><div class="grid-content bg-left">
                            <label class="lb-left">项目名称：</label>
                        </div></el-col>
                        <el-col :span="8"><div class="grid-content bg-right">
                            <el-input v-model="item.projectName" placeholder="请输入内容" size="medium" ></el-input>
                        </div></el-col>
                        <el-col :span="4"><div class="grid-content bg-left">
                            <label class="lb-left">职位：</label>
                        </div></el-col>
                        <el-col :span="8"><div class="grid-content bg-right">
                            <el-input v-model="item.projectPost" placeholder="请输入内容" size="medium" ></el-input>
                        </div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4"><div class="grid-content bg-left">
                            <label class="lb-left">备注：</label>
                        </div></el-col>
                        <el-col :span="20"><div class="grid-content bg-right">
                            <el-input v-model="item.remark" placeholder="请输入内容" size="medium" ></el-input>
                        </div></el-col>
                    </el-row>
                </div>
                <el-row>
                    <el-col :span="24"><div>
                        <el-button type="primary" icon="el-icon-circle-plus" size="mini" @click="addRecordProject">添加</el-button>
                    </div></el-col>
                </el-row>





                <el-row>
                    <el-col :span="24"><div class="grid-content bg-header">
                        <label style="float:left;">语言能力</label>
                    </div></el-col>
                </el-row>

                <!--语言能力-->
                <div v-for="item in bean.recordLanguageList" style="border: 1px solid #bdbdbd;margin: 5px 0px">
                    <el-row>
                        <el-col :span="4"><div class="grid-content bg-left">
                            <label class="lb-left">语言：</label>
                        </div></el-col>
                        <el-col :span="8"><div class="grid-content bg-right">
                            <el-select  v-model="item.language" placeholder="根节点">
                                <el-option
                                        v-for="item in dictMap.LanguageList"
                                        :key="item.code"
                                        :label="item.name"
                                        :value="item.code">
                                </el-option>
                            </el-select>
                        </div></el-col>
                        <el-col :span="4"><div class="grid-content bg-left">
                            <label class="lb-left">水平：</label>
                        </div></el-col>
                        <el-col :span="8"><div class="grid-content bg-right">
                            <el-select  v-model="item.level" placeholder="根节点">
                                <el-option
                                        v-for="item in dictMap.LanguageLevel"
                                        :key="item.code"
                                        :label="item.name"
                                        :value="item.code">
                                </el-option>
                            </el-select>
                            <i class="el-icon-delete" style="float: right;border: 1px solid #bdbdbd" @click="delRecordLanguage(item)"></i>
                        </div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4"><div class="grid-content bg-left">
                            <label class="lb-left">备注：</label>
                        </div></el-col>
                        <el-col :span="20"><div class="grid-content bg-right">
                            <el-input v-model="item.remark" placeholder="请输入内容" size="medium" ></el-input>
                        </div></el-col>
                    </el-row>
                </div>
                <el-row>
                    <el-col :span="24"><div>
                        <el-button type="primary" icon="el-icon-circle-plus" size="mini" @click="addRecordLanguage">添加</el-button>
                    </div></el-col>
                </el-row>


            </el-form>


            <div style="text-align: center;margin-top: 10px;margin-bottom: 10px;">
                <el-button size="mini" @click="closeDialog" icon="el-icon-circle-close-outline">取消</el-button>
                <el-button v-if="strOp!='view'" size="mini" type="primary" @click="save" icon="el-icon-success">确定</el-button>
            </div>

        </el-dialog>




    </section>
</template>
<script>
    import end from '@/common/js/utils.js'
    import {talentGetVo,talentGet,talentList,talentListAll,talentDel,talentSave,
        cityListAll,cityTree,dictListChildrenByCode,dictListChildrenByCodes,
        businessTree,careerTree,
        tagTreeByCode,docShareTree} from '@/api/api'
    import $ from 'jquery'
    export default {
        data() {
            return {
                loading: false,
                defaultPageSize: 10,
                pageParams:{
                    page: 1,
                    pageSize: 10,
                    totalRows: null,
                    totalPage: null,
                    orderBy: 'id',
                    direction: 'desc',
                    params: {
                        lk_name: null
                    },
                    data: []
                },
                tableCss: {
                    stripe: true
                },
                cellStyle: {
                    padding: 6
                },
                rowStyle: {},
                headerCellStyle: {
                    background: "#ededed",
                    fontSize: "18px",
                    fontWeight: "bolder",
                    border: '1px groove #dedede'
                },
                childheaderCellStyle: {
                    background: "#c9E5FF",
                    fontSize: "18px",
                    fontWeight: "bolder",
                    border: '1px groove #dedede'
                },
                multipleSelection: [],
                shows: [
                    {key: 1, prop: 'type', label: '类型', sortable: 'custom', type: '', orgin: 'type', width: '100'},
                    {key: 2, prop: 'avatar', label: '图片', sortable: 'custom', type: '', orgin: 'avatar', width: '120'},
                    {key: 3, prop: 'engName', label: '英文名', sortable: 'custom', type: '', orgin: 'engName', width: '120'},
                    {key: 4, prop: 'name', label: '名称', sortable: 'custom', type: '', orgin: 'name', width: '120'},
                    // {key: 5, prop: 'nativePlace', label: '籍贯', sortable: 'custom', type: '', orgin: 'nativePlace', width: '120'},
                    {key: 6, prop: 'city', label: '所在城市', sortable: 'custom', type: '', orgin: 'city', width: '120'},
                    {key: 7, prop: 'phone1', label: '电话1', sortable: 'custom', type: '', orgin: 'phone1', width: '120'},
                    {key: 8, prop: 'phone2', label: '电话2', sortable: 'custom', type: '', orgin: 'phone2', width: '120'},
                    {key: 9, prop: 'phone3', label: '电话3', sortable: 'custom', type: '', orgin: 'phone3', width: '120'},
                    {key: 10, prop: 'email1', label: '邮箱1', sortable: 'custom', type: '', orgin: 'email1', width: '120'},
                    {key: 11, prop: 'email2', label: '邮箱2', sortable: 'custom', type: '', orgin: 'email2', width: '120'},
                    {key: 12, prop: 'email3', label: '邮箱3', sortable: 'custom', type: '', orgin: 'email3', width: '120'},
                    {key: 13, prop: 'business', label: '行业', sortable: 'custom', type: '', orgin: 'business', width: '120'},
                    {key: 14, prop: 'career', label: '职能', sortable: 'custom', type: '', orgin: 'career', width: '120'},
                    {key: 15, prop: 'gender', label: '性别', sortable: 'custom', type: '', orgin: 'gender', width: '120'},
                    {key: 16, prop: 'birthdayStr', label: '生日', sortable: 'custom', type: 'date', orgin: 'birthday', width: '120'},
                    {key: 17, prop: 'marray', label: '婚姻状态', sortable: 'custom', type: '', orgin: 'marray', width: '120'},
                    {key: 18, prop: 'qq', label: 'qq', sortable: 'custom', type: '', orgin: 'qq', width: '120'},
                    {key: 19, prop: 'salary', label: '薪水', sortable: 'custom', type: '', orgin: 'salary', width: '120'},
                    {key: 20, prop: 'intentCity', label: '目标城市', sortable: 'custom', type: '', orgin: 'intentCity', width: '120'},
                    {key: 21, prop: 'tags', label: '标签', sortable: 'custom', type: '', orgin: 'tags', width: '120'},
                    {key: 22, prop: 'mpc', label: '是否mpc', sortable: 'custom', type: '', orgin: 'mpc', width: '120'},
                    {key: 23, prop: 'quality', label: '综合特质', sortable: 'custom', type: '', orgin: 'quality', width: '120'},
                    {key: 24, prop: 'family', label: '家庭状况', sortable: 'custom', type: '', orgin: 'family', width: '120'},
                    {key: 25, prop: 'purpose', label: '目标', sortable: 'custom', type: '', orgin: 'purpose', width: '120'},
                    {key: 26, prop: 'nowSalary', label: '现在薪水', sortable: 'custom', type: '', orgin: 'nowSalary', width: '120'},
                    {key: 27, prop: 'expSalary', label: '目标薪水', sortable: 'custom', type: '', orgin: 'expSalary', width: '120'},
                    {key: 28, prop: 'evaluate', label: '评估', sortable: 'custom', type: '', orgin: 'evaluate', width: '120'},
                    {key: 29, prop: 'remark', label: '备注', sortable: 'custom', type: '', orgin: 'remark', width: '120'},
                    {key: 30, prop: 'status', label: '状态', sortable: 'custom', type: '', orgin: 'status', width: '120'},
                    {key: 31, prop: 'flag', label: '状态位', sortable: 'custom', type: '', orgin: 'flag', width: '120'},
                    {key: 32, prop: 'createTimeStr', label: '创建时间', sortable: 'custom', type: 'date', orgin: 'createTime', width: '120'},
                    {key: 33, prop: 'createBy', label: '创建人', sortable: 'custom', type: '', orgin: 'createBy', width: '120'},
                    {key: 34, prop: 'modifyTimeStr', label: '修改时间', sortable: 'custom', type: 'date', orgin: 'modifyTime', width: '120'},
                    {key: 35, prop: 'modifyBy', label: '修改人', sortable: 'custom', type: '', orgin: 'modifyBy', width: '120'}
                ],
                showsOrgin: [
                    {key: 1, prop: 'type', label: '类型', sortable: 'custom', type: '', orgin: 'type', width: '100'},
                    {key: 2, prop: 'avatar', label: '图片', sortable: 'custom', type: '', orgin: 'avatar', width: '120'},
                    {key: 3, prop: 'engName', label: '英文名', sortable: 'custom', type: '', orgin: 'engName', width: '120'},
                    {key: 4, prop: 'name', label: '名称', sortable: 'custom', type: '', orgin: 'name', width: '120'},
                    {key: 30, prop: 'status', label: '状态', sortable: 'custom', type: '', orgin: 'status', width: '120'},
                    {key: 32, prop: 'createTimeStr', label: '创建时间', sortable: 'custom', type: 'date', orgin: 'createTime', width: '120'},
                    {key: 33, prop: 'createBy', label: '创建人', sortable: 'custom', type: '', orgin: 'createBy', width: '120'},
                    {key: 34, prop: 'modifyTimeStr', label: '修改时间', sortable: 'custom', type: 'date', orgin: 'modifyTime', width: '120'},
                    {key: 35, prop: 'modifyBy', label: '修改人', sortable: 'custom', type: '', orgin: 'modifyBy', width: '120'}
                ],
                chShows: [],
                nchShows: [],
                colSettingVisible: false,
                visible: false,
                bean: {
                    id: null,
                    type:null,
                    avatar: null,
                    engName: null,
                    name: null,
                    tmpNativePlace:null,
                    nativePlace: null,
                    tmpCity:null,
                    city: null,
                    phone1: null,
                    phone2: null,
                    phone3: null,
                    email1: null,
                    email2: null,
                    email3: null,
                    tmpBusinessId:null,
                    tmpBusinessName:null,
                    business: null,
                    tmpCareerId:null,
                    tmpCareerName:null,
                    career: null,
                    gender: null,
                    birthday: null,
                    marray: null,
                    salary: null,
                    tmpIntentCityId:null,
                    tmpIntentCityName:null,
                    intentCity: null,
                    tmpTagsName:null,
                    tmpTagsId:null,
                    tags: null,
                    mpc: null,
                    quality: null,
                    family: null,
                    purpose: null,
                    nowSalary: null,
                    expSalary: null,
                    evaluate: null,
                    remark: null,
                    status: null,
                    flag: null
                },
                strOp: null,
                cityList:null,
                cityTree:null,
                innerVisible:false,
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                editCityProp:null,
                businessTree:null,
                innerBusinessVisible:false,
                innerCareerVisible:false,
                careerTree:null,
                innerTagVisible:false,
                tagList:[],
                innerShareVisible:false,
                shareList:[],
                defaultShareKeys:[],
                dictMap:null
            }
        },
        watch: {

        },
        methods: {
            initDictMap(){
                let _this=this
                var d=["LanguageList","LanguageLevel","EducationLevel","TalentType","MarryStatus"]
                dictListChildrenByCodes({"codes":d}).then(p=>{
                    _this.dictMap=p
                })
            },
            initShare(){
                let _this=this
                if(null==_this.shareList||_this.shareList.length<1) {
                    docShareTree().then(p => {
                        _this.shareList = p
                    })
                }
            },
            initTags(){
                let _this =this
                if(null==_this.tagList||_this.tagList.length<1) {
                    tagTreeByCode({code: "talent"}).then(p => {
                        _this.tagList = p
                    })
                }
            },
            initCity(){
                let _this=this
                if(null==_this.cityList) {
                    cityListAll().then(p => {
                        _this.cityList = p
                    })
                }
                if(null==_this.cityTree) {
                    cityTree().then(p => {
                        _this.cityTree = p
                    })
                }
            },
            initCareer(){
                let _this=this
                if(null==_this.careerTree) {
                    careerTree().then(p => {
                        _this.careerTree = p
                    })
                }
            },
            initBusiness(){
                let _this=this
                if(null==_this.businessTree) {
                    businessTree().then(p => {
                        _this.businessTree = p
                    })
                }
            },
            init_chShows(){
                let _this=this
                this.showsOrgin.forEach(p=>{
                    _this.chShows.push(p.key)
                })
                this.shows.forEach(p=>{
                    let b=false
                    _this.showsOrgin.forEach(v=>{
                        if(p.key==v){
                            b=true
                        }
                    })
                    if(!b){
                        _this.nchShows.push(p)
                    }
                })
            },
            init(page,pageSize){
                var _this=this;
                _this.loading=true;
                _this.pageParams.page=page;
                _this.pageParams.pageSize=pageSize;
                talentList(_this.pageParams).then(res => {
                    res.data.forEach(p => {
                        p.modifyTimeStr = end.getDate_YMDHM(p.modifyTime)
                        p.createTimeStr = end.getDate_YMDHM(p.createTime)
                        p.birthdayStr = end.getDate_YMDHM(p.birthday)
                        p.edit=false
                    })
                    _this.pageParams=res
                    _this.loading=false;
                });
            },
            init(){
                var _this=this;
                _this.loading=true;
                talentList(_this.pageParams).then(res => {
                    res.data.forEach(p => {
                        p.modifyTimeStr = end.getDate_YMDHM(p.modifyTime)
                        p.createTimeStr = end.getDate_YMDHM(p.createTime)
                        p.birthdayStr = end.getDate_YMDHM(p.birthday)
                        p.edit=false
                    })
                    _this.pageParams=res
                    _this.loading=false;
                });
            },
            /**
             * 修改页码
             * @param item
             */
            handleCurrentChange(item){
                this.init(item,this.defaultPageSize)
            },

            /**
             *
             * 重置
             * */
            reset(){
                this.pageParams.params={
                    lk_name: null
                }
            },
            /**
             * 检索
             */
            search(){
                this.init(1,this.defaultPageSize)
            },
            /**
             * 新增
             */
            add(){
                this.bean= {
                    id: null,
                    type:null,
                    avatar: null,
                    engName: null,
                    name: null,
                    tmpNativePlace:null,
                    nativePlace: null,
                    tmpCity:null,
                    city: null,
                    phone1: null,
                    phone2: null,
                    phone3: null,
                    email1: null,
                    email2: null,
                    email3: null,
                    business: null,
                    career: null,
                    gender: null,
                    birthday: null,
                    marray: null,
                    salary: null,
                    intentCity: null,
                    tags: null,
                    mpc: null,
                    quality: null,
                    family: null,
                    purpose: null,
                    nowSalary: null,
                    expSalary: null,
                    evaluate: null,
                    remark: null,
                    status: null,
                    flag: null,
                    recordWorkList:[],
                    recordEducationList:[],
                    recordProjectList:[],
                    recordLanguageList:[]
                },
                    this.visible=true
                this.strOp='add'
            },
            edit(item){
                let _this=this
                talentGetVo({id:item.id}).then(p=>{
                    _this.bean=p
                })
                this.visible=true
                this.strOp='edit'
            },
            view(item){
                this.edit(item)
                this.strOp='view'
            },
            del(item){
                this.multipleSelection=[]
                this.multipleSelection.push(item.id)
                this.delBatch()
            },
            handleSizeChange(count){
                this.pageParams.pageSize=count
                this.init();
            },
            /**
             * 批量删除的选择
             * @param val
             */
            handleSelectionChange(val){
                let _this=this
                var delIds=[]
                val.forEach(p=>{
                    delIds.push(p.id)
                })
                _this.multipleSelection=delIds
            },
            delBatch(){
                let _this=this
                if(_this.multipleSelection==null||_this.multipleSelection.length<1){
                    _this.$message({
                        message: '请先选择需要删除的人才数据',
                        type: 'warning'
                    });
                    return;
                }
                this.$confirm('此操作将永久删除该人才数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    talentDel({ids:_this.multipleSelection}).then(p=>{
                        _this.$message({
                            message: '删除人才数据成功',
                            type: 'success'
                        });
                        _this.init()
                    }).catch(function (error) {
                        _this.$message.error('后端错误:'+error.message);
                    })
                }).catch(() => {
                    _this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            sortChange(column){
                let _this=this
                _this.shows.forEach(p=>{
                    if(p.prop==column.prop){
                        _this.pageParams.orderBy=p.orgin
                    }
                })
                _this.pageParams.direction=column.order=="descending"?"desc":"asc"
                _this.init();
            },
            colSetting(){
                this.colSettingVisible=true
            },
            closeColSettingDialog(){
                this.colSettingVisible=false
            },
            saveColSetting(){
                let _this=this
                _this.showsOrgin=[]
                _this.chShows.forEach(p=>{
                    _this.shows.forEach(v=>{
                        if(p==v.key){
                            _this.showsOrgin.push(v)
                        }
                    })
                })
                _this.colSettingVisible=false
            },
            closeDialog(){
                this.visible=false
            },
            save(){
                let _this=this
                talentSave(_this.bean).then(p=>{
                    _this.$message({
                        message: '保存人才数据成功',
                        type: 'success'
                    });
                    _this.visible=false
                    _this.init()
                }).catch(function (error) {
                    _this.$message.error('后端错误:'+error.message);
                })
            },
            cityChoose(prop){
                let _this=this
                _this.editCityProp=prop

                _this.innerVisible=true
                var d = []
                _this.$nextTick(() => {
                    switch (prop){
                        case "nativePlace":{
                            if(null!=_this.bean.nativePlace) {
                                d.push(_this.bean.nativePlace)
                            }
                            _this.$refs.tree2.setCheckedKeys(d)
                        };break;
                        case "city":{
                            if(null!=_this.bean.city) {
                                d.push(this.bean.city)
                            }
                            _this.$refs.tree2.setCheckedKeys(d)
                        }break;
                        case "intentCity":{
                            if(_this.bean.tmpIntentCityId!=null) {
                                d=_this.bean.tmpIntentCityId
                            }
                            _this.$refs.tree2.setCheckedKeys(d)
                        }break;
                    }
                });
            },
            closeInnerDialog(){
                this.innerVisible=false
            },
            chooseInnerCity(){
                let _this=this
                var length=0
                this.$refs.tree2.getCheckedNodes().forEach(p=>{
                    if(p.leaf){
                        length++
                    }
                })

                if(this.editCityProp=='nativePlace'||this.editCityProp=='city'){
                    if(length!=1){
                        _this.$message({
                            message: '必须并且只能选择一个城市',
                            type: 'warning'
                        });
                        return;
                    }

                    if (this.editCityProp == 'nativePlace') {
                        _this.bean.tmpNativePlace = this.$refs.tree2.getCheckedNodes()[0].name
                        _this.bean.nativePlace = this.$refs.tree2.getCheckedNodes()[0].id
                    }
                    else {
                        _this.bean.tmpCity = this.$refs.tree2.getCheckedNodes()[0].name
                        _this.bean.city = this.$refs.tree2.getCheckedNodes()[0].id
                    }
                }
                else if(this.editCityProp=='intentCity'){
                    if(length<1){
                        _this.$message({
                            message: '必须最少选择一个城市',
                            type: 'warning'
                        });
                        return;
                    }
                    _this.bean.intentCity=""
                    _this.bean.tmpIntentCityId=[]
                    _this.bean.tmpIntentCityName=""
                    this.$refs.tree2.getCheckedNodes().forEach(p=>{
                        if(p.leaf){
                            _this.bean.intentCity+=p.id+","
                            _this.bean.tmpIntentCityId.push(p.id)
                            _this.bean.tmpIntentCityName+=p.name+","
                        }
                    })

                }
                this.innerVisible=false
            },
            chooseInnerBusiness(){
                let _this=this
                this.innerBusinessVisible=false
                var lenth=this.$refs.businessTree.getCheckedNodes().length
                if(lenth<1){
                    _this.$message({
                        message: '必须并且只能选择一个行业',
                        type: 'warning'
                    });
                    return;
                }

                _this.bean.tmpBusinessId=[]
                _this.bean.tmpBusinessName=""
                _this.bean.business=""
                this.$refs.businessTree.getCheckedNodes().forEach(p=>{
                    if(p.leaf){
                        _this.bean.tmpBusinessId.push(p.id)
                        _this.bean.tmpBusinessName+=p.name+","
                        _this.bean.business+=p.id+","
                    }
                })
            },
            businessChoose(){
                let _this=this
                _this.innerBusinessVisible=true
                var d=[]
                _this.$nextTick(() => {
                    if(!(_this.bean.tmpBusinessId==null||_this.bean.tmpBusinessId.length<1)){
                        d=_this.bean.tmpBusinessId
                    }
                    _this.$refs.businessTree.setCheckedKeys(d)
                });
            },
            closeInnerBusinessDialog(){
                this.innerBusinessVisible=false
            },

            careerChoose(){
                let _this=this
                this.innerCareerVisible=true
                var d=[]
                _this.$nextTick(() => {
                    if(!(_this.bean.tmpCareerId==null||_this.bean.tmpCareerId.length<1)){
                        d=_this.bean.tmpCareerId
                    }
                    _this.$refs.careerTree.setCheckedKeys(d)
                });
            },
            closeInnerCareerDialog(){
                this.innerCareerVisible=false
            },
            chooseInnerCareer(){
                let _this=this
                this.innerCareerVisible=false
                var lenth=this.$refs.careerTree.getCheckedNodes().length
                if(lenth<1){
                    _this.$message({
                        message: '必须并且只能选择一个职能',
                        type: 'warning'
                    });
                    return;
                }

                _this.bean.tmpCareerId=[]
                _this.bean.tmpCareerName=""
                _this.bean.career=""
                this.$refs.careerTree.getCheckedNodes().forEach(p=>{
                    if(p.leaf){
                        _this.bean.tmpCareerId.push(p.id)
                        _this.bean.tmpCareerName+=p.name+","
                        _this.bean.career+=p.id+","
                    }
                })
            },

            tagChoose(){
                let _this=this
                this.innerTagVisible=true
                var d=[]
                _this.$nextTick(() => {
                    if(!(_this.bean.tmpTagsId==null||_this.bean.tmpTagsId.length<1)){
                        d=_this.bean.tmpTagsId
                    }
                    _this.$refs.tag.setCheckedKeys(d)
                });
            },
            closeInnerTagDialog(){
                this.innerTagVisible=false
            },
            chooseInnerTag(){
                let _this=this

                var lenth=this.$refs.tag.getCheckedNodes().length
                if(lenth<1){
                    _this.$message({
                        message: '必须并且只能选择一个标签',
                        type: 'warning'
                    });
                    return;
                }
                this.innerTagVisible=false
                _this.bean.tmpTagsId=[]
                _this.bean.tmpTagsName=""
                _this.bean.tags=""
                this.$refs.tag.getCheckedNodes().forEach(p=>{
                    if(p.leaf){
                        _this.bean.tmpTagsId.push(p.id)
                        _this.bean.tmpTagsName+=p.name+","
                        _this.bean.tags+=p.id+","
                    }
                })
            },


            shareChoose(){
                let _this=this
                this.innerShareVisible=true
                var d=[]
                _this.$nextTick(() => {
                    if(!(_this.bean.shareTalentList==null||_this.bean.shareTalentList.length<1)){
                        _this.bean.shareTalentList.forEach(p=>{
                            d.push(p.shareType+p.shareValue)
                        })
                    }
                    _this.$refs.shareList.setCheckedKeys(d)
                });
            },
            closeInnerShareDialog(){
                this.innerShareVisible=false
            },
            chooseInnerShare(){
                let _this=this

                var lenth=this.$refs.shareList.getCheckedNodes().length
                if(lenth<1){
                    _this.$message({
                        message: '必须并且只能选择一种共享方式',
                        type: 'warning'
                    });
                    return;
                }
                this.innerShareVisible=false
                this.bean.shareTalentList=[]
                this.$refs.shareList.getCheckedNodes().forEach(p=>{
                    if(p.leaf){
                        var tmp={
                            shareType:_this.checkShareType(p.value),
                            shareValue:_this.checkShareValue(p.value),
                            shareLabel:p.label
                        }
                        _this.bean.shareTalentList.push(tmp)
                    }
                })
            },

            checkShareType(str){
                var types=["account","position","team","all"]
                var result=""
                types.forEach(p=>{
                    if(str.indexOf(p)>-1){
                        result=p
                    }
                })
                return result;
            },
            checkShareValue(str){
                if(str.indexOf("all")>-1){
                    return null
                }
                else {
                    return this.getNumberV(str)
                }
            },
            getNumberV(str){
                return parseInt(str.replace(/[^0-9]/ig,""))
            },
            //添加工作记录
            addRecordWork(){
                let _this =this
                var item={
                    startDate:null,
                    endDate:null,
                    onJob:null,
                    companyName:null,
                    businessName:null,
                    remark:null
                }
                _this.bean.recordWorkList.push(item)
            },
            delRecordWork(item){
                let _this=this
                var d=[]
                _this.bean.recordWorkList.forEach(p=>{
                    if(p.companyName!=item.companyName){
                        d.push(p)
                    }
                })
                _this.bean.recordWorkList=d
            },

            addRecordEducation(){
                var _this=this
                var item={
                    startDate:null,
                    endDate:null,
                    onCollege:null,
                    college:null,
                    major:null,
                    education:null
                }
                _this.bean.recordEducationList.push(item)
            },
            delRecordEducation(item){
                let _this=this
                var d=[]
                _this.bean.recordEducationList.forEach(p=>{
                    if(!(p.college==item.college&&p.education==item.education)){
                        d.push(p)
                    }
                })
                _this.bean.recordEducationList=d
            },

            addRecordProject(){
                var _this=this
                var item={
                    startDate:null,
                    endDate:null,
                    projectName:null,
                    projectPost:null,
                    remark:null
                }
                _this.bean.recordProjectList.push(item)
            },
            delRecordProject(item){
                let _this=this
                var d=[]
                _this.bean.recordProjectList.forEach(p=>{
                    if(!(p.projectName==item.projectName&&p.projectPost==item.projectPost)){
                        d.push(p)
                    }
                })
                _this.bean.recordProjectList=d
            },

            addRecordLanguage(){
                var _this=this
                var item={
                    language:null,
                    level:null,
                    remark:null
                }
                _this.bean.recordLanguageList.push(item)
            },
            delRecordLanguage(item){
                let _this=this
                var d=[]
                _this.bean.recordLanguageList.forEach(p=>{
                    if(!(p.language==item.language&&p.level==item.level)){
                        d.push(p)
                    }
                })
                _this.bean.recordLanguageList=d
            },


        },
        created () {
            this.init();
            this.initCity();
            this.initBusiness();
            this.initCareer();
            this.initTags();
            this.initShare();
            this.init_chShows();

            this.initDictMap();
        },
        components: {
        }
    }

</script>
<style lang="scss" scoped>
</style>