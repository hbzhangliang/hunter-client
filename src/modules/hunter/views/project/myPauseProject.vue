<template>
    <section>
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


                    <el-table-column sortable="custom" prop="" label="公司编号" align="center" min-width="80">
                        <template scope="scope">
                            <el-popover
                                    placement="bottom"
                                    width="400"
                                    @show="companyShow(scope.row)"
                                    trigger="click">
                                <el-form  size="small">

                                    <el-row>
                                        <el-col :span="24"><div class="grid-content bg-header">
                                            <label style="float:left;">类型</label>
                                        </div></el-col>
                                    </el-row>

                                    <el-form-item label="编号" class="hidden">
                                        <el-input v-model="viewCompany.id" placeholder="请输入内容" size="medium"></el-input>
                                    </el-form-item>

                                    <el-row>
                                        <el-col :span="4"><div class="grid-content bg-left">
                                            <label class="lb-left">公司类型：</label>
                                        </div></el-col>
                                        <el-col :span="8"><div class="grid-content bg-right">
                                            <el-radio-group v-model="viewCompany.type">
                                                <el-radio v-for="item in dictMap.CorpType" :label="item.code">{{item.name}}</el-radio>
                                            </el-radio-group>
                                        </div></el-col>
                                        <el-col :span="4"><div class="grid-content bg-left">
                                            <label class="lb-left">子母公司：</label>
                                        </div></el-col>
                                        <el-col :span="8"><div class="grid-content bg-right">
                                            <el-radio-group v-model="viewCompany.mtype">
                                                <el-radio v-for="item in dictMap.CorpMtype" :label="item.code">{{item.name}}</el-radio>
                                            </el-radio-group>
                                        </div></el-col>
                                    </el-row>


                                    <el-row>
                                        <el-col :span="24"><div class="grid-content bg-header">
                                            <label style="float:left;">基本信息</label>
                                        </div></el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="4"><div class="grid-content bg-left">
                                            <label class="lb-left">名称：</label>
                                        </div></el-col>
                                        <el-col :span="8"><div class="grid-content bg-right">
                                            <el-input v-model="viewCompany.name" placeholder="请输入内容" size="medium"></el-input>
                                        </div></el-col>
                                        <el-col :span="4"><div class="grid-content bg-left">
                                            <label class="lb-left">简称：</label>
                                        </div></el-col>
                                        <el-col :span="8"><div class="grid-content bg-right">
                                            <el-input v-model="viewCompany.shortName" placeholder="请输入内容" size="medium"></el-input>
                                        </div></el-col>
                                    </el-row>


                                    <el-row>
                                        <el-col :span="4"><div class="grid-content bg-left">
                                            <label class="lb-left">行业：</label>
                                        </div></el-col>
                                        <el-col :span="8"><div class="grid-content bg-right">
                                            <el-input v-model="viewCompany.tmpBusinessName" placeholder="请输入内容" size="medium" readonly="true"></el-input>
                                        </div></el-col>
                                        <el-col :span="4"><div class="grid-content bg-left">
                                            <label class="lb-left">城市：</label>
                                        </div></el-col>
                                        <el-col :span="8"><div class="grid-content bg-right">
                                            <el-input v-model="viewCompany.tmpCityName" placeholder="请输入内容" size="medium" readonly="true"></el-input>
                                        </div></el-col>
                                    </el-row>


                                    <el-row>
                                        <el-col :span="4"><div class="grid-content bg-left">
                                            <label class="lb-left">融资情况：</label>
                                        </div></el-col>
                                        <el-col :span="8"><div class="grid-content bg-right">
                                            <el-radio-group v-model="viewCompany.finance">
                                                <el-radio v-for="item in dictMap.CorpFinace" :label="item.code">{{item.name}}</el-radio>
                                            </el-radio-group>
                                        </div></el-col>
                                        <el-col :span="4"><div class="grid-content bg-left">
                                            <label class="lb-left">共享方式：</label>
                                        </div></el-col>
                                    </el-row>

                                    <el-row>
                                        <el-col :span="24"><div class="grid-content bg-header">
                                            <label style="float:left;">公司介绍</label>
                                        </div></el-col>
                                    </el-row>

                                    <el-row>
                                        <el-col :span="4"><div class="grid-content bg-left">
                                            <label class="lb-left">公司简介：</label>
                                        </div></el-col>
                                        <el-col :span="20"><div class="grid-content bg-right">
                                            <el-input v-model="viewCompany.introduce" placeholder="请输入内容" size="medium" ></el-input>
                                        </div></el-col>
                                    </el-row>
                                </el-form>
                                <a class="aLink" slot="reference">{{scope.row.companyId}}</a>
                            </el-popover>
                        </template>
                    </el-table-column>

                    <el-table-column sortable="custom" prop="mtype" label="联系人名称" align="center" min-width="80">
                        <template scope="scope">
                            <el-popover
                                    placement="bottom"
                                    width="600"
                                    @show="talentShow(scope.row)"
                                    trigger="click">
                                <el-table :data="viewTalentList" border v-loading="loading"
                                          size="mini"
                                          border>
                                    <el-table-column  prop="name" label="名称" align="center">
                                    </el-table-column>
                                    <el-table-column  prop="engName" label="英文名" align="center">
                                    </el-table-column>
                                    <el-table-column  prop="gender" label="性别" align="center">
                                        <template scope="scope">
                                            <span v-if="1==scope.row.gender">男</span>
                                            <span v-else>女</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column  prop="type" label="类型" align="center">
                                        <template scope="scope">
                                            <span v-for="item in dictMap.TalentType" v-if="item.code==scope.row.type">{{item.name}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column  prop="tmpNativePlace" label="籍贯" align="center">
                                    </el-table-column>
                                    <el-table-column  prop="" label="图像" align="center">
                                        <template scope="scope">
                                            <img :src="scope.row.avatar" class="list-img"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column  prop="phone1" label="电话" align="center">
                                    </el-table-column>
                                    <el-table-column  prop="email1" label="Email" align="center">
                                    </el-table-column>
                                    <el-table-column  prop="tmpBusinessName" label="行业" align="center">
                                    </el-table-column>
                                    <el-table-column  prop="tmpCareerName" label="职能" align="center">
                                    </el-table-column>
                                </el-table>
                                <a class="aLink" slot="reference">{{scope.row.talentIds}}</a>
                            </el-popover>
                        </template>
                    </el-table-column>


                    <el-table-column sortable="custom" prop="type" label="类型" align="center" min-width="80">
                        <template scope="scope">
                            <span v-for="item in dictMap.ProjectPriority" v-if="item.code==scope.row.priority">{{item.name}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column sortable="custom" prop="mtype" label="状态" align="center" min-width="80">
                        <template scope="scope">
                            <span v-for="item in dictMap.ProcessStatus" v-if="item.code==scope.row.pstatus">{{item.name}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column v-for="item in showsOrgin" :sortable="item.sortable" :prop="item.prop" :label="item.label" :width="item.width">
                    </el-table-column>
                    <el-table-column  label="操作" width="228" fixed="right">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" icon="el-icon-edit-outline" @click="edit(scope.row)"></el-button>
                            <el-button size="mini" type="success" icon="el-icon-view" @click="view(scope.row)"></el-button>
                            <el-button size="mini" type="danger" icon="el-icon-delete" @click="del(scope.row)"></el-button>
                            <el-dropdown @command="setting">
                                <el-button size="mini" type="warning" icon="el-icon-setting">
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item :command="generateComd('shareDoc',scope.row)">分享到文件夹</el-dropdown-item>
                                    <el-dropdown-item>狮子头</el-dropdown-item>
                                    <el-dropdown-item>螺蛳粉</el-dropdown-item>
                                    <el-dropdown-item>双皮奶</el-dropdown-item>
                                    <el-dropdown-item>蚵仔煎</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
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
        <el-dialog title="项目项列展示选择" :visible.sync="colSettingVisible" size="tiny"
                   @close="closeColSettingDialog" width="550px">
            <template>
                <el-transfer v-model="chShows" :data="nchShows"></el-transfer>
            </template>
            <div style="text-align: center;margin-top: 25px">
                <el-button size="mini" @click="closeColSettingDialog" icon="el-icon-circle-close-outline">取消</el-button>
                <el-button size="mini" type="primary" @click="saveColSetting" icon="el-icon-success">确定</el-button>
            </div>
        </el-dialog>



        <el-dialog title="项目信息编辑" :visible.sync="visible" size="tiny"
                   @close="closeDialog">
            <el-dialog
                    size="tiny"
                    width="30%"
                    title="城市选择"
                    :visible.sync="innerVisible"
                    append-to-body>
                <el-tree
                        class="filter-tree city-tree"
                        :data="treeMap.CityTree"
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
                    title="共享选择"
                    :visible.sync="innerShareVisible"
                    append-to-body>
                <el-tree
                        class="filter-tree tag-tree"
                        :data="treeMap.ShareTree"
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


            <el-dialog
                    size="tiny"
                    width="30%"
                    title="职能选择"
                    :visible.sync="innerCareerVisible"
                    append-to-body>
                <el-tree
                        class="filter-tree city-tree"
                        :data="treeMap.CareerTree"
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
                    width="80%"
                    title="人才选择"
                    :visible.sync="innerTalentVisible"
                    append-to-body>

                <div class="tableBox">
                    <div class="pageTableContent">
                        <el-table :data="pageParamsTalent.data" border
                                  size="mini"
                                  @selection-change="handleSelectionChangeTalent"
                                  border>
                            <el-table-column width="50"
                                             fixed
                                             type="selection">
                            </el-table-column>
                            <el-table-column  prop="name" label="名称" align="center">
                            </el-table-column>
                            <el-table-column  prop="engName" label="英文名" align="center">
                            </el-table-column>
                            <el-table-column  prop="gender" label="性别" align="center">
                                <template scope="scope">
                                    <span v-if="1==scope.row.gender">男</span>
                                    <span v-else>女</span>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="type" label="类型" align="center">
                                <template scope="scope">
                                    <span v-for="item in dictMap.TalentType" v-if="item.code==scope.row.type">{{item.name}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column sortable="custom" prop="nativePlace" label="籍贯" align="center" min-width="120">
                                <template scope="scope">
                                    <span v-for="item in cityList" v-if="item.id==scope.row.nativePlace">{{item.name}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="" label="图像" align="center">
                                <template scope="scope">
                                    <img :src="scope.row.avatar" class="list-img"/>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="phone1" label="电话" align="center">
                            </el-table-column>
                            <el-table-column  prop="email1" label="Email" align="center">
                            </el-table-column>
                        </el-table>

                    </div>

                    <div class="block">
                        <span class="demonstration"></span>
                        <el-pagination v-if="pageParamsTalent.totalRows"
                                       @current-change="handleCurrentChangeTalent"
                                       @size-change="handleSizeChangeTalent"
                                       :current-page.sync="pageParamsTalent.page"
                                       :page-sizes="[10, 20, 50, 100,200]"
                                       :page-size="pageParamsTalent.pageSize"
                                       layout="total,sizes,prev, pager, next, jumper"
                                       :total="pageParamsTalent.totalRows">
                        </el-pagination>
                    </div>

                    <div style="text-align: center;margin-top: 10px;margin-bottom: 10px;">
                        <el-button size="mini" @click="closeInnerTalentDialog" icon="el-icon-circle-close-outline">取消</el-button>
                        <el-button size="mini" type="primary" @click="chooseInnerTalent" icon="el-icon-success">确定</el-button>
                    </div>
                </div>
            </el-dialog>




            <el-form  size="small">

                <el-row>
                    <el-col :span="24"><div class="grid-content bg-header">
                        <label style="float:left;">基本信息</label>
                    </div></el-col>
                </el-row>

                <el-form-item label="编号" class="hidden">
                    <el-input v-model="bean.id" placeholder="请输入内容" size="medium"></el-input>
                </el-form-item>

                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">项目名称：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.name" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">招聘人数：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.scount" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                </el-row>


                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">客户公司：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.companyId" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">客户联系人：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.tmpTalentNames" placeholder="请输入内容" size="medium"></el-input>
                        <el-button size="mini" type="primary" @click="talentAdd" icon="el-icon-setting">添加</el-button>
                        <el-button size="mini" type="warning" @click="talentClean" icon="el-icon-setting">清空</el-button>
                    </div></el-col>
                </el-row>

                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">城市：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.tmpCityName" placeholder="请输入内容" size="medium" readonly="true"></el-input>
                        <el-button size="mini" type="primary" @click="cityChoose" icon="el-icon-setting">选择</el-button>
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
                        <label class="lb-left">年薪：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.salary" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">优先级：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-select  v-model="bean.priority" placeholder="根节点">
                            <el-option
                                    v-for="item in dictMap.ProjectPriority"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code">
                            </el-option>
                        </el-select>
                    </div></el-col>
                </el-row>

                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">开始时间：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-date-picker
                                v-model="bean.startTime"
                                type="date"
                                placeholder="请选择开始时间">
                        </el-date-picker>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">结束时间：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-date-picker
                                v-model="bean.endTime"
                                type="date"
                                placeholder="请选择结束时间">
                        </el-date-picker>
                    </div></el-col>
                </el-row>

                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">状态：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-select  v-model="bean.pstatus" placeholder="根节点">
                            <el-option
                                    v-for="item in dictMap.ProcessStatus"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code">
                            </el-option>
                        </el-select>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">项目参与者：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-button size="mini" type="primary" @click="shareChoose" icon="el-icon-setting">选择</el-button>
                    </div></el-col>
                </el-row>

                <el-row>
                    <el-col :span="24"><div class="grid-content bg-header">
                        <label style="float:left;">职位描述</label>
                    </div></el-col>
                </el-row>

                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">职位描述：</label>
                    </div></el-col>
                    <el-col :span="20"><div class="grid-content bg-right">
                        <el-input type="textarea"
                                  :autosize="{ minRows: 20, maxRows: 22}"
                                  placeholder="职位描述"
                                  v-model="bean.description">
                        </el-input>
                    </div></el-col>
                </el-row>


            </el-form>
            <div style="text-align: center;margin-top: 10px;margin-bottom: 10px;">
                <el-button size="mini" @click="closeDialog" icon="el-icon-circle-close-outline">取消</el-button>
                <el-button v-if="strOp!='view'" size="mini" type="primary" @click="save" icon="el-icon-success">确定</el-button>
            </div>

        </el-dialog>


        <!--doc文档数据-->
        <el-dialog
                size="tiny"
                width="30%"
                title="选择分享到的文件夹"
                :visible.sync="shareDocVisible">
            <el-tree
                    class="filter-tree city-tree"
                    :data="shareDocList"
                    :props="defaultProps"
                    show-checkbox
                    node-key="id"
                    ref="shareDoc">
            </el-tree>
            <div style="text-align: center;margin-top: 10px;margin-bottom: 10px;">
                <el-button size="mini" @click="closeShareDocDialog" icon="el-icon-circle-close-outline">取消</el-button>
                <el-button size="mini" type="primary" @click="chooseShareDocDialog" icon="el-icon-success">确定</el-button>
            </div>
        </el-dialog>



    </section>
</template>
<script>
    import {projectGetVo,projectGet,projectList,projectListPage,projectListAll,projectDel,projectAdminDel,projectSave,projectShareList,
        projectDocList,projectDocListAll,projectDocSave,projectDocGet,projectDocDel,projectDocAddShare,projectDocsByProjectId,
        vProjectDocList,vProjectDocGet,
        dictListChildrenByCodes,utilTree,docListOwnerFront,
        companyGetVo,cityListAll,
        talentList
    } from '@/api/api'
    import $ from 'jquery'
    import end from '@/common/js/utils.js'
    export default {
        data:function () {
            return{
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
                        eq_pstatus:"Pause",
                        eq_delStatus:"Normal",
                        lk_name: null
                    },
                    data: []
                },
                pageParamsTalent:{
                    page: 1,
                    pageSize: 10,
                    totalRows: null,
                    totalPage: null,
                    orderBy: 'id',
                    direction: 'desc',
                    params: {
                        eq_delStatus:"Normal",
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
                    {key: 1, prop: 'name', label: '名称', sortable: 'custom', type: '', orgin: 'type', width: '100'},
                    {key: 2, prop: 'scount', label: '数量', sortable: 'custom', type: '', orgin: 'avatar', width: '120'},
                    {key: 3, prop: 'companyId', label: '公司编号', sortable: 'custom', type: '', orgin: 'companyId', width: '120'},
                    {key: 4, prop: 'talentIds', label: '联系人编号', sortable: 'custom', type: '', orgin: 'talentIds', width: '120'},
                    {key: 5, prop: 'city', label: '城市', sortable: 'custom', type: '', orgin: 'city', width: '120'},
                    {key: 6, prop: 'position', label: '职位', sortable: 'custom', type: '', orgin: 'position', width: '120'},
                    {key: 7, prop: 'salary', label: '薪水', sortable: 'custom', type: '', orgin: 'salary', width: '120'},
                    {key: 8, prop: 'priority', label: '优先级', sortable: 'custom', type: '', orgin: 'priority', width: '120'},
                    {key: 9, prop: 'startTimeStr', label: '开始时间', sortable: 'custom', type: 'date', orgin: 'startTime', width: '120'},
                    {key: 10, prop: 'endTimeStr', label: '结束时间', sortable: 'custom', type: 'date', orgin: 'endTime', width: '120'},
                    {key: 11, prop: 'pstatus', label: '类别', sortable: 'custom', type: '', orgin: 'pstatus', width: '120'},
                    {key: 12, prop: 'description', label: '描述', sortable: 'custom', type: '', orgin: 'description', width: '120'},
                    {key: 13, prop: 'status', label: '状态', sortable: 'custom', type: '', orgin: 'status', width: '120'},
                    {key: 14, prop: 'flag', label: '状态位', sortable: 'custom', type: '', orgin: 'flag', width: '120'},
                    {key: 15, prop: 'createTimeStr', label: '创建时间', sortable: 'custom', type: 'date', orgin: 'createTime', width: '120'},
                    {key: 16, prop: 'createBy', label: '创建人', sortable: 'custom', type: '', orgin: 'createBy', width: '120'},
                    {key: 17, prop: 'modifyTimeStr', label: '修改时间', sortable: 'custom', type: 'date', orgin: 'modifyTime', width: '120'},
                    {key: 18, prop: 'modifyBy', label: '修改人', sortable: 'custom', type: '', orgin: 'modifyBy', width: '120'}
                ],
                showsOrgin: [
                    {key: 1, prop: 'name', label: '名称', sortable: 'custom', type: '', orgin: 'type', width: '100'},
                    {key: 2, prop: 'scount', label: '数量', sortable: 'custom', type: '', orgin: 'avatar', width: '120'},
                    {key: 3, prop: 'companyId', label: '公司编号', sortable: 'custom', type: '', orgin: 'companyId', width: '120'},
                    {key: 4, prop: 'talentIds', label: '联系人编号', sortable: 'custom', type: '', orgin: 'talentIds', width: '120'},
                    {key: 5, prop: 'city', label: '城市', sortable: 'custom', type: '', orgin: 'city', width: '120'},
                    {key: 6, prop: 'position', label: '职位', sortable: 'custom', type: '', orgin: 'position', width: '120'},
                ],
                chShows: [],
                nchShows: [],
                colSettingVisible: false,
                bean:{
                    id:null,
                    name:null,
                    scount:null,
                    companyId:null,
                    talentIds:null,
                    tmpTalentNames:null,
                    tmpTalentIds:null,
                    talentVoList:null,
                    tmpCityId:null,
                    tmpCityName:null,
                    city:null,
                    tmpCareerId:null,
                    tmpCareerName:null,
                    position:null,
                    salary:null,
                    priority:null,
                    startTime:null,
                    endTime:null,
                    description:null,
                    pstatus:null,
                    delStatus:null,
                    flag:null,
                    status:null
                },
                innerCareerVisible:false,
                innerShareVisible:false,
                innerVisible:false,
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                dictMap:{
                    ProjectPriority:[],
                    ProcessStatus:[],
                    CorpType:[],
                    CorpMtype:[],
                    CorpFinace:[],
                    LanguageList:[],
                    LanguageLevel:[],
                    EducationLevel:[],
                    TalentType:[],
                    MarryStatus:[]
                },
                treeMap:{
                    CareerTree:[],
                    CityTree:[],
                    ShareTree:[]
                },
                visible: false,
                strOp: null,

                shareDocVisible:false,
                shareDocList:[],
                editProject:null,
                defaultShareDocIds:[],
                defaultShareKeys:[],
                viewCompany:{
                    id:null,
                    type:null,
                    mtype:null,
                    parentId:null,
                    name:null,
                    owner:null,
                    shortName:null,
                    tmpBusinessId:null,
                    tmpBusinessName:null,
                    business:null,
                    tmpCityId:null,
                    tmpCityName:null,
                    city:null,
                    finance:null,
                    introduce:null,
                    delStatus:null,
                    flag:null,
                    status:null,
                },
                viewTalentList:[],
                cityList:[],

                //人才选择
                innerTalentVisible:false,
                talentList:[],
                multipleSelectionTalent:[]

            }
        },
        methods:{
            initCity(){
                let _this=this
                if(null==_this.cityList) {
                    cityListAll().then(p => {
                        _this.cityList = p
                    })
                }
            },
            initDictMap(){
                let _this=this
                var d=["ProjectPriority","ProcessStatus","CorpType","CorpMtype","CorpFinace","LanguageList","LanguageLevel","EducationLevel","TalentType","MarryStatus"]
                dictListChildrenByCodes({"codes":d}).then(p=>{
                    _this.dictMap=p
                    console.log(p)
                })
            },
            initTreeMap(){
                let _this=this
                var d=["CareerTree","CityTree","ShareTree"]
                utilTree({"codes":d}).then(p=>{
                    _this.treeMap=p
                })
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
                projectList(_this.pageParams).then(res => {
                    res.data.forEach(p => {
                        p.modifyTimeStr = end.getDate_YMDHM(p.modifyTime)
                        p.createTimeStr = end.getDate_YMDHM(p.createTime)
                        p.startTimeStr = end.getDate_YMDHM(p.startTime)
                        p.endTimeStr = end.getDate_YMDHM(p.endTime)
                        p.edit=false
                    })
                    _this.pageParams=res
                    _this.loading=false;
                });
            },
            init(){
                var _this=this;
                _this.loading=true;
                projectList(_this.pageParams).then(res => {
                    res.data.forEach(p => {
                        p.modifyTimeStr = end.getDate_YMDHM(p.modifyTime)
                        p.createTimeStr = end.getDate_YMDHM(p.createTime)
                        p.startTimeStr = end.getDate_YMDHM(p.startTime)
                        p.endTimeStr = end.getDate_YMDHM(p.endTime)
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

            add() {
                this.bean={
                    id:null,
                    name:null,
                    scount:null,
                    companyId:null,
                    talentIds:null,
                    tmpTalentNames:null,
                    tmpTalentIds:null,
                    talentVoList:null,
                    tmpCityId:null,
                    tmpCityName:null,
                    city:null,
                    tmpCareerId:null,
                    tmpCareerName:null,
                    position:null,
                    salary:null,
                    priority:null,
                    startTime:null,
                    endTime:null,
                    description:null,
                    pstatus:null,
                    delStatus:null,
                    flag:null,
                    status:null
                },
                    this.visible=true
                this.strOp='add'
            },
            edit(item){
                let _this=this
                projectGetVo({id:item.id}).then(p=>{
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
                        message: '请先选择需要删除的项目数据',
                        type: 'warning'
                    });
                    return;
                }
                this.$confirm('此操作将永久删除该项目数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    projectDel({ids:_this.multipleSelection}).then(p=>{
                        _this.$message({
                            message: '删除项目数据成功',
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
                projectSave(_this.bean).then(p=>{
                    _this.$message({
                        message: '保存项目数据成功',
                        type: 'success'
                    });
                    _this.visible=false
                    _this.init()
                }).catch(function (error) {
                    _this.$message.error('后端错误:'+error.message);
                })
            },
            cityChoose(){
                let _this=this
                _this.innerVisible=true
                var d = []
                _this.$nextTick(() => {
                    if(null!=_this.bean.tmpCityId) {
                        d=_this.bean.tmpCityId
                    }
                    _this.$refs.tree2.setCheckedKeys(d)

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
                if(length<1){
                    _this.$message({
                        message: '必须最少选择一个城市',
                        type: 'warning'
                    });
                    return;
                }
                _this.bean.city=""
                _this.bean.tmpCityId=[]
                _this.bean.tmpCityName=""
                this.$refs.tree2.getCheckedNodes().forEach(p=>{
                    if(p.leaf){
                        _this.bean.city+=p.id+","
                        _this.bean.tmpCityId.push(p.id)
                        _this.bean.tmpCityName+=p.name+","
                    }
                })
                this.innerVisible=false
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
                _this.bean.position=""
                this.$refs.careerTree.getCheckedNodes().forEach(p=>{
                    if(p.leaf){
                        _this.bean.tmpCareerId.push(p.id)
                        _this.bean.tmpCareerName+=p.name+","
                        _this.bean.position+=p.id+","
                    }
                })
            },
            shareChoose(){
                let _this=this
                this.innerShareVisible=true
                var d=[]
                _this.$nextTick(() => {
                    if(!(_this.bean.shareProjectList==null||_this.bean.shareProjectList.length<1)){
                        _this.bean.shareProjectList.forEach(p=>{
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
                this.bean.shareProjectList=[]
                this.$refs.shareList.getCheckedNodes().forEach(p=>{
                    if(p.leaf){
                        var tmp={
                            shareType:_this.checkShareType(p.value),
                            shareValue:_this.checkShareValue(p.value),
                            shareLabel:p.label
                        }
                        _this.bean.shareProjectList.push(tmp)
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
            /**
             * 生成drop的comand
             * @param comd
             * @param item
             * @returns {{key: *, value: *}}
             */
            generateComd(comd,item){
                var obj={
                    key:comd,
                    value:item
                }
                return obj
            },
            //分享到文件夹
            setting(item){
                let _this=this
                switch (item.key){
                    case "shareDoc":{
                        _this.shareDocVisible=true
                        _this.editProject=item.value
                        _this.initShareDocList()
                    }break;
                }
            },
            initShareDocList(){
                let _this=this
                if(_this.shareDocList==null||_this.shareDocList.length<1) {
                    docListOwnerFront({type:"project"}).then(p => {
                        console.log(p)
                        _this.shareDocList = p

                        projectDocsByProjectId({id:_this.editProject.id}).then(q=>{
                            console.log(q)
                            _this.$nextTick(() => {
                                _this.$refs.shareDoc.setCheckedKeys(q)
                            });
                        })
                    })
                }
                else {
                    projectDocsByProjectId({id:_this.editProject.id}).then(q=>{
                        console.log(q)
                        _this.$nextTick(() => {
                            _this.$refs.shareDoc.setCheckedKeys(q)
                        });
                    })
                }
            },
            closeShareDocDialog(){
                this.shareDocVisible=false
            },
            chooseShareDocDialog(){
                let _this=this
                var d=[]
                var lenth=this.$refs.shareDoc.getCheckedNodes().length
                if(lenth<1){
                    _this.$message({
                        message: '必须至少选择一个文件夹',
                        type: 'warning'
                    });
                    return;
                }
                this.$refs.shareDoc.getCheckedNodes().forEach(p=>{
                    if(p.leaf){
                        d.push(p.id)
                    }
                })
                projectDocAddShare({projectId:_this.editProject.id,docIds:d}).then(p=>{
                    _this.$message({
                        message: '共享项目数据到文件夹成功',
                        type: 'success'
                    });
                    _this.shareDocVisible=false
                }).catch(function (error) {
                    _this.$message.error('后端错误:'+error.message);
                })
            },
            companyShow(item){
                let _this=this
                companyGetVo({id:item.id}).then(p=>{
                    _this.viewCompany=p
                })
            },
            talentShow(item){
                let _this=this
                projectGetVo({id:item.id}).then(p=>{
                    console.log(p.talentVoList)
                    _this.viewTalentList=p.talentVoList
                })
            },
            talentAdd(){
                let _this=this
                this.innerTalentVisible=true
                this.initTalent()
            },
            talentClean(){
                let _this=this
                _this.bean.talentIds=""
                _this.bean.tmpTalentIds=[]
                _this.bean.tmpTalentNames=""
                _this.bean.talentVoList=[]
            },

            closeInnerTalentDialog(){
                this.innerTalentVisible=false
            },
            chooseInnerTalent(){
                let _this=this
                this.innerTalentVisible=false
                this.multipleSelectionTalent.forEach(p=>{
                    if(!end.checkInStr(_this.bean.talentIds,p)){
                        _this.bean.talentIds+=p+","

                        //名称也加上去
                        _this.pageParamsTalent.data.forEach(q=>{
                            if(p==q.id){
                                if(_this.bean.tmpTalentNames==null){
                                    _this.bean.tmpTalentNames=""
                                }
                                _this.bean.tmpTalentNames+=q.name+","
                            }
                        })
                    }
                })
            },
            handleCurrentChangeTalent(item){
                this.pageParamsTalent.page=item
                this.initTalent()
            },
            handleSizeChangeTalent(count){
                this.pageParamsTalent.pageSize=count
                this.initTalent();
            },
            initTalent(){
                var _this=this;
                _this.loading=true;
                talentList(_this.pageParamsTalent).then(res => {
                    console.log(res)
                    _this.pageParamsTalent=res
                    _this.loading=false;
                });
            },
            handleSelectionChangeTalent(val){
                let _this=this
                var d=[]
                val.forEach(p=>{
                    d.push(p.id)
                })
                _this.multipleSelectionTalent=d
            }

        },
        components: {},
        computed: {},
        created() {
            this.init()
            this.init_chShows()
            this.initDictMap()
            this.initTreeMap()
        }
    }
</script>
<style lang="scss" scoped>

</style>
