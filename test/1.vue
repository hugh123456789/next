<template>
  <div class="research-platform">
    <!-- 查询和操作区域 -->
    <div class="toolbar">
      <div class="search-section">
        <el-input
          v-model="searchKeyword"
          placeholder="请输入关键词（项目名称、基线类型等）"
          style="width: 400px; margin-right: 10px;"
          clearable
          @keyup.enter.native="searchData">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button type="primary" @click="searchData">查询</el-button>
        <el-button @click="resetSearch">重置</el-button>
      </div>
      <div class="action-section">
        <el-button type="success" @click="showAddDialog">新增数据</el-button>
      </div>
    </div>

    <!-- 主表格 -->
    <el-table
      :data="filteredTableData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      border>
      <el-table-column type="expand">
        <template slot-scope="props">
          <div class="child-table-container">
            <div class="platform-info">
              <span class="platform-label">产品项目当量：</span>
              <span class="platform-value">{{ props.row.productEquivalent }}</span>
              <span class="pin-label">复杂度系数：</span>
              <span class="pin-value">{{ props.row.complexityCoefficient }}</span>
              <span class="pin-label">工程资质：</span>
              <span class="pin-value">{{ props.row.engineeringQualification }}</span>
            </div>
            <el-table
              :data="[props.row.phaseData]"
              border
              style="width: 100%; margin-top: 10px;">
              <el-table-column
                prop="baseline"
                label="开发人力基线"
                width="150">
                <template slot-scope="scope">
                  <span class="baseline-value">{{ scope.row.baseline }}</span>
                </template>
              </el-table-column>

              <!-- 白盒类型显示独立阶段 -->
              <template v-if="props.row.productType === 'whitebox'">
                <el-table-column :label="getWhiteboxRfqLabel(props.row.baselineType)" width="100">
                  <template slot-scope="scope">
                    <span class="percentage">{{ scope.row.rfq || '0.00' }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="getWhiteboxPdLabel(props.row.baselineType)" width="100">
                  <template slot-scope="scope">
                    <span class="percentage">{{ scope.row.pd || '0.00' }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="getWhiteboxEvtLabel(props.row.baselineType)" width="100">
                  <template slot-scope="scope">
                    <span class="percentage">{{ scope.row.evt || '0.00' }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="getWhiteboxDvtLabel(props.row.baselineType)" width="100">
                  <template slot-scope="scope">
                    <span class="percentage">{{ scope.row.dvt || '0.00' }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="getWhiteboxPvtLabel(props.row.baselineType)" width="100">
                  <template slot-scope="scope">
                    <span class="percentage">{{ scope.row.pvt || '0.00' }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="getWhiteboxMpLabel(props.row.baselineType)" width="100">
                  <template slot-scope="scope">
                    <span class="percentage">{{ scope.row.mp || '0.00' }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="GA (0%)" width="100">
                  <template slot-scope="scope">
                    <span class="percentage">{{ scope.row.ga || '0.00' }}</span>
                  </template>
                </el-table-column>
              </template>

              <!-- 商用类型显示TR阶段 -->
              <template v-else>
                <el-table-column :label="getCommercialTr1Tr3Label(props.row.baselineType)" width="120">
                  <template slot-scope="scope">
                    <span class="percentage">{{ scope.row.tr1_tr3 }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="getCommercialTr4Label(props.row.baselineType)" width="100">
                  <template slot-scope="scope">
                    <span class="percentage">{{ scope.row.tr4 }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="getCommercialTr4aLabel(props.row.baselineType)" width="100">
                  <template slot-scope="scope">
                    <span class="percentage">{{ scope.row.tr4a }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="getCommercialTr5Label(props.row.baselineType)" width="100">
                  <template slot-scope="scope">
                    <span class="percentage">{{ scope.row.tr5 }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="getCommercialTr6Label(props.row.baselineType)" width="100">
                  <template slot-scope="scope">
                    <span class="percentage">{{ scope.row.tr6 }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="GA (0%)" width="100">
                  <template slot-scope="scope">
                    <span class="percentage">{{ scope.row.ga }}</span>
                  </template>
                </el-table-column>
              </template>
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="项目"
        prop="projectName"
        width="200">
      </el-table-column>
      <el-table-column
        label="基线类型"
        prop="baselineType">
      </el-table-column>
      <el-table-column
        label="产品类型"
        prop="productType"
        width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.productType === 'commercial' ? '商用' : '白盒' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="showEditDialog(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增数据对话框 -->
    <el-dialog
      title="新增研发基线数据"
      :visible.sync="addDialogVisible"
      width="80vw"
      @close="resetAddForm">
      <el-form :model="addForm" :rules="addFormRules" ref="addForm" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="项目名称" prop="projectName">
              <el-select
                v-model="addForm.projectName"
                placeholder="请选择或输入项目名称"
                filterable
                allow-create
                default-first-option
                style="width: 100%;">
                <el-option
                  v-for="item in projectList"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="基线类型" prop="baselineType">
              <el-select v-model="addForm.baselineType" placeholder="请选择基线类型" style="width: 100%;" @change="onBaselineTypeChange">
                <el-option label="结构设计基线" value="结构设计基线"></el-option>
                <el-option label="散热设计基线" value="散热设计基线"></el-option>
                <el-option label="整机工艺设计基线" value="整机工艺设计基线"></el-option>
                <el-option label="单板工艺设计基线" value="单板工艺设计基线"></el-option>
                <el-option label="PCB设计基线" value="PCB设计基线"></el-option>
                <el-option label="逻辑设计基线" value="逻辑设计基线"></el-option>
                <el-option label="平台架构设计-平台SE基线" value="平台架构设计-平台SE基线"></el-option>
                <el-option label="平台项目管理-平台PM基线" value="平台项目管理-平台PM基线"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 动态表单区域 -->
        <div v-if="addForm.baselineType">
          <!-- 结构设计基线 -->
          <div v-if="addForm.baselineType === '结构设计基线'">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="产品项目当量" prop="productEquivalent">
                  <el-select v-model="addForm.productEquivalent" placeholder="请选择" style="width: 100%;" @change="calculateBaseline">
                    <el-option label="1U全新box（12.8T平台基准）= 1" :value="1"></el-option>
                    <el-option label="2U/4U设备 = 2.5" :value="2.5"></el-option>
                    <el-option label="框式设备 = 5" :value="5"></el-option>
                    <el-option label="单卡/单板 = 0.8" :value="0.8"></el-option>
                    <el-option label="1U交换节点 = 1.5" :value="1.5"></el-option>
                    <el-option label="自定义" value="custom"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="addForm.productEquivalent === 'custom'">
                <el-form-item label="自定义当量值">
                  <el-input-number v-model="addForm.customProductEquivalent" :min="0" :step="0.1" style="width: 100%;" @change="calculateBaseline"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="产品类型" prop="productType">
                  <el-radio-group v-model="addForm.productType" @change="calculateBaseline">
                    <el-radio label="commercial">商用/通用白盒</el-radio>
                    <el-radio label="jdm">JDM白盒</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="复杂度系数" prop="complexityCoefficient">
                  <el-select v-model="addForm.complexityCoefficient" placeholder="请选择" style="width: 100%;" @change="calculateBaseline">
                    <template v-if="addForm.productType === 'commercial'">
                      <el-option label="全新架构-风冷 = 1.2" :value="1.2"></el-option>
                      <el-option label="全新架构-液冷 = 1.5" :value="1.5"></el-option>
                      <el-option label="传统设计（有参考架构）= 1.0" :value="1.0"></el-option>
                      <el-option label="改制方案 = 0.2" :value="0.2"></el-option>
                      <el-option label="改制方案 = 0.4" :value="0.4"></el-option>
                      <el-option label="改制方案 = 0.6" :value="0.6"></el-option>
                      <el-option label="改制方案 = 0.8" :value="0.8"></el-option>
                      <el-option label="全新工装机箱 = 1.0" :value="1.0"></el-option>
                    </template>
                    <template v-else-if="addForm.productType === 'jdm'">
                      <el-option label="全新架构-风冷 = 1.3" :value="1.3"></el-option>
                      <el-option label="全新架构-液冷 = 1.6" :value="1.6"></el-option>
                      <el-option label="传统设计 = 1.1" :value="1.1"></el-option>
                      <el-option label="改制方案 = 0.3" :value="0.3"></el-option>
                      <el-option label="改制方案 = 0.5" :value="0.5"></el-option>
                      <el-option label="改制方案 = 0.7" :value="0.7"></el-option>
                      <el-option label="改制方案 = 0.9" :value="0.9"></el-option>
                      <el-option label="全新工装机箱 = 1.1" :value="1.1"></el-option>
                    </template>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="工程资质" prop="engineeringQualification">
                  <el-select v-model="addForm.engineeringQualification" placeholder="请选择" style="width: 100%;" @change="calculateBaseline">
                    <el-option label="4级（专家）= 6" :value="6"></el-option>
                    <el-option label="3级（高级）= 4.5" :value="4.5"></el-option>
                    <el-option label="2级（中级）= 3" :value="3"></el-option>
                    <el-option label="1级（初级）= 2" :value="2"></el-option>
                    <el-option label="自定义" value="custom"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" v-if="addForm.engineeringQualification === 'custom'">
              <el-col :span="12">
                <el-form-item label="自定义资质值">
                  <el-input-number v-model="addForm.customEngineeringQualification" :min="0" :step="0.1" style="width: 100%;" @change="calculateBaseline"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <!-- 散热设计基线 -->
          <div v-else-if="addForm.baselineType === '散热设计基线'">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="产品项目当量" prop="productEquivalent">
                  <el-select v-model="addForm.productEquivalent" placeholder="请选择" style="width: 100%;" @change="calculateBaseline">
                    <el-option label="1U标准box（TD或同档次）= 1" :value="1"></el-option>
                    <el-option label="2U/4U = 2" :value="2"></el-option>
                    <el-option label="框式 = 4" :value="4"></el-option>
                    <el-option label="单卡/单板 = 0.5" :value="0.5"></el-option>
                    <el-option label="1U交换节点 = 1.5" :value="1.5"></el-option>
                    <el-option label="自定义" value="custom"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="addForm.productEquivalent === 'custom'">
                <el-form-item label="自定义当量值">
                  <el-input-number v-model="addForm.customProductEquivalent" :min="0" :step="0.1" style="width: 100%;" @change="calculateBaseline"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="产品类型" prop="productType">
                  <el-radio-group v-model="addForm.productType" @change="calculateBaseline">
                    <el-radio label="commercial">商用/通用白盒</el-radio>
                    <el-radio label="jdm">JDM白盒</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="复杂度系数" prop="complexityCoefficient">
                  <el-select v-model="addForm.complexityCoefficient" placeholder="请选择" style="width: 100%;" @change="calculateBaseline">
                    <template v-if="addForm.productType === 'commercial'">
                      <el-option label="全新一代液冷 = 1.6" :value="1.6"></el-option>
                      <el-option label="全新一代风冷 = 1.5" :value="1.5"></el-option>
                      <el-option label="当代MAC散热器全新方案（风冷）= 1.2" :value="1.2"></el-option>
                      <el-option label="当代MAC散热器全新方案（液冷）= 1.3" :value="1.3"></el-option>
                      <el-option label="改制方案 = 0.4" :value="0.4"></el-option>
                      <el-option label="改制方案 = 0.6" :value="0.6"></el-option>
                    </template>
                    <template v-else-if="addForm.productType === 'jdm'">
                      <el-option label="全新一代液冷 = 1.7" :value="1.7"></el-option>
                      <el-option label="全新一代风冷 = 1.6" :value="1.6"></el-option>
                      <el-option label="当代MAC散热器全新方案（风冷）= 1.3" :value="1.3"></el-option>
                      <el-option label="当代MAC散热器全新方案（液冷）= 1.4" :value="1.4"></el-option>
                      <el-option label="改制方案 = 0.5" :value="0.5"></el-option>
                      <el-option label="改制方案 = 0.7" :value="0.7"></el-option>
                    </template>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="工程资质" prop="engineeringQualification">
                  <el-select v-model="addForm.engineeringQualification" placeholder="请选择" style="width: 100%;" @change="calculateBaseline">
                    <el-option label="4级 = 5" :value="5"></el-option>
                    <el-option label="3级 = 5.5" :value="5.5"></el-option>
                    <el-option label="2级 = 4" :value="4"></el-option>
                    <el-option label="1级 = 3" :value="3"></el-option>
                    <el-option label="自定义" value="custom"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="功耗系数" prop="basePower">
                  <el-input-number v-model="addForm.basePower" placeholder="输入功率" :min="0" style="width: 100%;" @change="calculateBaseline"></el-input-number>
                  <div style="font-size: 12px; color: #999; margin-top: 5px;">
                    基准功率：1U-TOR=500W, 1U-TD5=1200W, 1U-TH5=1600W, 2U/4U-TH5=2800W, 4U-TH6=4000W
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" v-if="addForm.engineeringQualification === 'custom'">
              <el-col :span="12">
                <el-form-item label="自定义资质值">
                  <el-input-number v-model="addForm.customEngineeringQualification" :min="0" :step="0.1" style="width: 100%;" @change="calculateBaseline"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <!-- 整机工艺设计基线 -->
          <div v-else-if="addForm.baselineType === '整机工艺设计基线'">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="产品项目当量" prop="productEquivalent">
                  <el-select v-model="addForm.productEquivalent" placeholder="请选择" style="width: 100%;" @change="calculateBaseline">
                    <el-option label="1U全新box（12.8T平台基准）= 1" :value="1"></el-option>
                    <el-option label="2U/4U = 2.5" :value="2.5"></el-option>
                    <el-option label="框式 = 5" :value="5"></el-option>
                    <el-option label="单卡/单板 = 0.8" :value="0.8"></el-option>
                    <el-option label="自定义" value="custom"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="addForm.productEquivalent === 'custom'">
                <el-form-item label="自定义当量值">
                  <el-input-number v-model="addForm.customProductEquivalent" :min="0" :step="0.1" style="width: 100%;" @change="calculateBaseline"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="复杂度系数" prop="complexityCoefficient">
                  <el-select v-model="addForm.complexityCoefficient" placeholder="请选择" style="width: 100%;" @change="calculateBaseline">
                    <el-option label="全新架构液冷 = 1.4" :value="1.4"></el-option>
                    <el-option label="全新架构风冷 = 1.2" :value="1.2"></el-option>
                    <el-option label="传统设计 = 1.2" :value="1.2"></el-option>
                    <el-option label="架构不变，MAC散热器新做的改制品 = 0.8" :value="0.8"></el-option>
                    <el-option label="改制方案 = 0.8" :value="0.8"></el-option>
                    <el-option label="改制方案 = 0.6" :value="0.6"></el-option>
                    <el-option label="改制方案 = 0.4" :value="0.4"></el-option>
                    <el-option label="改制方案 = 0.2" :value="0.2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="工程资质" prop="engineeringQualification">
                  <el-select v-model="addForm.engineeringQualification" placeholder="请选择" style="width: 100%;" @change="calculateBaseline">
                    <el-option label="4级 = 13" :value="13"></el-option>
                    <el-option label="3级 = 11" :value="11"></el-option>
                    <el-option label="2级 = 0" :value="0.1"></el-option>
                    <el-option label="1级 = 5" :value="5"></el-option>
                    <el-option label="自定义" value="custom"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" v-if="addForm.engineeringQualification === 'custom'">
              <el-col :span="12">
                <el-form-item label="自定义资质值">
                  <el-input-number v-model="addForm.customEngineeringQualification" :min="0" :step="0.1" style="width: 100%;" @change="calculateBaseline"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <!-- 单板工艺设计基线 -->
          <div v-else-if="addForm.baselineType === '单板工艺设计基线'">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="项目总PIN数" prop="totalPins">
                  <el-input-number v-model="addForm.totalPins" placeholder="输入总PIN数" :min="0" style="width: 100%;" @change="calculateBaseline"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="复杂度系数" prop="complexityCoefficient">
                  <el-select v-model="addForm.complexityCoefficient" placeholder="请选择" style="width: 100%;" @change="calculateBaseline">
                    <el-option label="高复杂产品 = 2.0" :value="2.0"></el-option>
                    <el-option label="业界首样（关键部品与上游同步开发）= 1.5" :value="1.5"></el-option>
                    <el-option label="全新架构（业界成熟方案我司首次应用）= 1.2" :value="1.2"></el-option>
                    <el-option label="传统设计（成熟工艺与器件）= 1.0" :value="1.0"></el-option>
                    <el-option label="改制方案 = 0.8" :value="0.8"></el-option>
                    <el-option label="改制方案 = 0.6" :value="0.6"></el-option>
                    <el-option label="改制方案 = 0.4" :value="0.4"></el-option>
                    <el-option label="改制方案 = 0.2" :value="0.2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="借用率" prop="borrowingRate">
                  <el-select v-model="addForm.borrowingRate" placeholder="请选择" style="width: 100%;" @change="calculateBaseline">
                    <el-option label="PCBA布局小改动，个别常规器件替代升级 = 0.8" :value="0.8"></el-option>
                    <el-option label="PCBA成熟器件主芯片或IO变更升级 = 0.5" :value="0.5"></el-option>
                    <el-option label="PCBA我司首次应用的主芯片或IO替换 = 0.2" :value="0.2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <!-- PCB设计基线 -->
          <div v-else-if="addForm.baselineType === 'PCB设计基线'">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="项目总PIN数" prop="totalPins">
                  <el-input-number v-model="addForm.totalPins" placeholder="输入总PIN数" :min="0" style="width: 100%;" @change="calculateBaseline"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="复杂度系数" prop="pcbComplexityCoefficient">
                  <el-select v-model="addForm.pcbComplexityCoefficient" placeholder="请选择" style="width: 100%;" @change="calculateBaseline">
                    <el-option label="白盒 = 1.3" :value="1.3"></el-option>
                    <el-option label="商用 = 1.0" :value="1.0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="借用率" prop="pcbBorrowingRate">
                  <el-select v-model="addForm.pcbBorrowingRate" placeholder="请选择" style="width: 100%;" @change="calculateBaseline">
                    <el-option label="主MAC芯片成熟应用，扇出层面与参考板基本一致，主器件布局基本一致 = 0.5" :value="0.5"></el-option>
                    <el-option label="主MAC芯片成熟应用，扇出层面与参考板基本一致，布局需要调整 = 0.3" :value="0.3"></el-option>
                    <el-option label="主MAC芯片成熟应用，但扇出层面需要压缩调整，布局需要调整 = 0.1" :value="0.1"></el-option>
                    <el-option label="整板全新设计 = 0" :value="0"></el-option>
                    <el-option label="主MAC芯片全新，其他周边基本一致 = 0.3" :value="0.3"></el-option>
                    <el-option label="其他非MAC单板改制，布局小改动 = 0.6" :value="0.6"></el-option>
                    <el-option label="其他非MAC单板改制，布局大改动 = 0.2" :value="0.2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <!-- 逻辑设计基线 -->
          <div v-else-if="addForm.baselineType === '逻辑设计基线'">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="FPGA/CPLD行数" prop="fpgaLines">
                  <el-input-number v-model="addForm.fpgaLines" placeholder="输入行数" :min="0" style="width: 100%;" @change="calculateBaseline"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="复杂度系数" prop="logicComplexityCoefficient">
                  <el-select v-model="addForm.logicComplexityCoefficient" placeholder="请选择" style="width: 100%;" @change="calculateBaseline">
                    <el-option label="全新项目 = 1" :value="1"></el-option>
                    <el-option label="改制项目 = 0.8" :value="0.8"></el-option>
                    <el-option label="维护项目 = 0.6" :value="0.6"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="复杂度" prop="logicComplexity">
                  <el-select v-model="addForm.logicComplexity" placeholder="请选择" style="width: 100%;" @change="calculateBaseline">
                    <el-option label="全新功能 = 3" :value="3"></el-option>
                    <el-option label="升级功能C = 2.5" :value="2.5"></el-option>
                    <el-option label="升级功能B = 2" :value="2"></el-option>
                    <el-option label="升级功能A = 1.5" :value="1.5"></el-option>
                    <el-option label="沿用功能 = 1" :value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="工程资质" prop="engineeringQualification">
                  <el-select v-model="addForm.engineeringQualification" placeholder="请选择" style="width: 100%;" @change="calculateBaseline">
                    <el-option label="4级 = 360000" :value="360000"></el-option>
                    <el-option label="3级 = 300000" :value="300000"></el-option>
                    <el-option label="2级 = 240000" :value="240000"></el-option>
                    <el-option label="1级 = 180000" :value="180000"></el-option>
                    <el-option label="自定义" value="custom"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" v-if="addForm.engineeringQualification === 'custom'">
              <el-col :span="12">
                <el-form-item label="自定义资质值">
                  <el-input-number v-model="addForm.customEngineeringQualification" :min="0" :step="1000" style="width: 100%;" @change="calculateBaseline"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <!-- 平台架构设计-平台SE基线 -->
          <div v-else-if="addForm.baselineType === '平台架构设计-平台SE基线'">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="产品项目当量" prop="productEquivalent">
                  <el-select v-model="addForm.productEquivalent" placeholder="请选择" style="width: 100%;" @change="calculateBaseline">
                    <el-option label="1U全新box为单位（12.8T平台为例）= 1.5" :value="1.5"></el-option>
                    <el-option label="2U/4U = 2" :value="2"></el-option>
                    <el-option label="框式 = 3" :value="3"></el-option>
                    <el-option label="单张卡/单板 = 1" :value="1"></el-option>
                    <el-option label="1U交换节点 = 1.5" :value="1.5"></el-option>
                    <el-option label="自定义" value="custom"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="addForm.productEquivalent === 'custom'">
                <el-form-item label="自定义当量值">
                  <el-input-number v-model="addForm.customProductEquivalent" :min="0" :step="0.1" style="width: 100%;" @change="calculateBaseline"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="产品类型" prop="productType">
                  <el-radio-group v-model="addForm.productType" @change="calculateBaseline">
                    <el-radio label="commercial">商用/通用白盒</el-radio>
                    <el-radio label="jdm">JDM白盒</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="复杂度系数" prop="complexityCoefficient">
                  <el-select v-model="addForm.complexityCoefficient" placeholder="请选择" style="width: 100%;" @change="calculateBaseline">
                    <template v-if="addForm.productType === 'commercial'">
                      <el-option label="全新架构液冷 = 1.4" :value="1.4"></el-option>
                      <el-option label="全新架构风冷 = 1.2" :value="1.2"></el-option>
                      <el-option label="传统设计（已有类似架构参考）= 1.0" :value="1.0"></el-option>
                      <el-option label="改制方案 = 0.4" :value="0.4"></el-option>
                      <el-option label="改制方案 = 0.6" :value="0.6"></el-option>
                      <el-option label="改制方案 = 0.8" :value="0.8"></el-option>
                    </template>
                    <template v-else-if="addForm.productType === 'jdm'">
                      <el-option label="全新架构液冷 = 1.5" :value="1.5"></el-option>
                      <el-option label="全新架构风冷 = 1.3" :value="1.3"></el-option>
                      <el-option label="传统设计（已有类似架构参考）= 1.1" :value="1.1"></el-option>
                      <el-option label="改制方案 = 0.5" :value="0.5"></el-option>
                      <el-option label="改制方案 = 0.7" :value="0.7"></el-option>
                      <el-option label="改制方案 = 0.9" :value="0.9"></el-option>
                    </template>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="工程资质" prop="engineeringQualification">
                  <el-select v-model="addForm.engineeringQualification" placeholder="请选择" style="width: 100%;" @change="calculateBaseline">
                    <el-option label="4级 = 7" :value="7"></el-option>
                    <el-option label="3级 = 6" :value="6"></el-option>
                    <el-option label="2级 = 4" :value="4"></el-option>
                    <el-option label="自定义" value="custom"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" v-if="addForm.engineeringQualification === 'custom'">
              <el-col :span="12">
                <el-form-item label="自定义资质值">
                  <el-input-number v-model="addForm.customEngineeringQualification" :min="0" :step="0.1" style="width: 100%;" @change="calculateBaseline"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <!-- 平台项目管理-平台PM基线 -->
          <div v-else-if="addForm.baselineType === '平台项目管理-平台PM基线'">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="产品项目当量" prop="productEquivalent">
                  <el-select v-model="addForm.productEquivalent" placeholder="请选择" style="width: 100%;" @change="calculateBaseline">
                    <el-option label="1U全新box为单位（12.8T平台为例）= 1" :value="1"></el-option>
                    <el-option label="2U/4U = 1.5" :value="1.5"></el-option>
                    <el-option label="框式 = 2" :value="2"></el-option>
                    <el-option label="单张卡/单板 = 0.8" :value="0.8"></el-option>
                    <el-option label="1U交换节点 = 1" :value="1"></el-option>
                    <el-option label="自定义" value="custom"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="addForm.productEquivalent === 'custom'">
                <el-form-item label="自定义当量值">
                  <el-input-number v-model="addForm.customProductEquivalent" :min="0" :step="0.1" style="width: 100%;" @change="calculateBaseline"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="复杂度系数" prop="complexityCoefficient">
                  <el-select v-model="addForm.complexityCoefficient" placeholder="请选择" style="width: 100%;" @change="calculateBaseline">
                    <el-option label="全新 = 1.0" :value="1.0"></el-option>
                    <el-option label="改制 = 0.8" :value="0.8"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="工程资质" prop="engineeringQualification">
                  <el-select v-model="addForm.engineeringQualification" placeholder="请选择" style="width: 100%;" @change="calculateBaseline">
                    <el-option label="4级 = 6.5" :value="6.5"></el-option>
                    <el-option label="3级 = 5.5" :value="5.5"></el-option>
                    <el-option label="2级 = 4.5" :value="4.5"></el-option>
                    <el-option label="自定义" value="custom"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" v-if="addForm.engineeringQualification === 'custom'">
              <el-col :span="12">
                <el-form-item label="自定义资质值">
                  <el-input-number v-model="addForm.customEngineeringQualification" :min="0" :step="0.1" style="width: 100%;" @change="calculateBaseline"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="项目类型选择" prop="projectTypeSelection">
              <el-radio-group v-model="addForm.projectTypeSelection" @change="calculateBaseline">
                <el-radio label="commercial">商用项目</el-radio>
                <el-radio label="whitebox">白盒项目</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <!-- 基线数据表格显示区域 -->
      <div class="baseline-data-container" v-if="calculatedData.baseline && calculatedData.baseline !== '0.00'">
        <div class="platform-info">
          <span class="platform-label">工作总量：</span>
          <span class="platform-value">{{ calculatedData.workload || '0.00' }}</span>
          <span class="pin-label">开发人力基线：</span>
          <span class="pin-value">{{ calculatedData.baseline || '0.00' }}</span>
        </div>
        <el-table
          :data="[calculatedData]"
          border
          style="width: 100%; margin-top: 10px;">
          <el-table-column
            prop="baseline"
            label="开发人力基线"
            width="150">
            <template slot-scope="scope">
              <span class="baseline-value">{{ scope.row.baseline || '0.00' }}</span>
            </template>
          </el-table-column>

          <!-- 白盒类型显示所有独立阶段 -->
          <template v-if="addForm.projectTypeSelection === 'whitebox'">
            <el-table-column :label="getAddWhiteboxRfqLabel()" width="100">
              <template slot-scope="scope">
                <span class="percentage">{{ scope.row.rfq || '0.00' }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="getAddWhiteboxPdLabel()" width="100">
              <template slot-scope="scope">
                <span class="percentage">{{ scope.row.pd || '0.00' }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="getAddWhiteboxEvtLabel()" width="100">
              <template slot-scope="scope">
                <span class="percentage">{{ scope.row.evt || '0.00' }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="getAddWhiteboxDvtLabel()" width="100">
              <template slot-scope="scope">
                <span class="percentage">{{ scope.row.dvt || '0.00' }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="getAddWhiteboxPvtLabel()" width="100">
              <template slot-scope="scope">
                <span class="percentage">{{ scope.row.pvt || '0.00' }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="getAddWhiteboxMpLabel()" width="100">
              <template slot-scope="scope">
                <span class="percentage">{{ scope.row.mp || '0.00' }}</span>
              </template>
            </el-table-column>
            <el-table-column label="GA (0%)" width="100">
              <template slot-scope="scope">
                <span class="percentage">{{ scope.row.ga || '0.00' }}</span>
              </template>
            </el-table-column>
          </template>

          <!-- 商用类型显示TR阶段 -->
          <template v-else>
            <el-table-column :label="getAddCommercialTr1Tr3Label()" width="120">
              <template slot-scope="scope">
                <span class="percentage">{{ scope.row.tr1_tr3 || '0.00' }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="getAddCommercialTr4Label()" width="100">
              <template slot-scope="scope">
                <span class="percentage">{{ scope.row.tr4 || '0.00' }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="getAddCommercialTr4aLabel()" width="100">
              <template slot-scope="scope">
                <span class="percentage">{{ scope.row.tr4a || '0.00' }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="getAddCommercialTr5Label()" width="100">
              <template slot-scope="scope">
                <span class="percentage">{{ scope.row.tr5 || '0.00' }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="getAddCommercialTr6Label()" width="100">
              <template slot-scope="scope">
                <span class="percentage">{{ scope.row.tr6 || '0.00' }}</span>
              </template>
            </el-table-column>
            <el-table-column label="GA (0%)" width="100">
              <template slot-scope="scope">
                <span class="percentage">{{ scope.row.ga || '0.00' }}</span>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitAddForm">确定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑数据对话框 -->
    <el-dialog
      title="编辑研发基线数据"
      :visible.sync="editDialogVisible"
      width="80vw"
      @close="resetEditForm">
      <!-- 编辑表单内容与新增类似，这里简化处理 -->
      <el-form :model="editForm" :rules="editFormRules" ref="editForm" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="项目名称" prop="projectName">
              <el-select
                v-model="editForm.projectName"
                placeholder="请选择或输入项目名称"
                filterable
                allow-create
                default-first-option
                style="width: 100%;">
                <el-option
                  v-for="item in projectList"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="基线类型" prop="baselineType">
              <el-select v-model="editForm.baselineType" placeholder="请选择基线类型" style="width: 100%;" disabled>
                <el-option label="结构设计基线" value="结构设计基线"></el-option>
                <el-option label="散热设计基线" value="散热设计基线"></el-option>
                <el-option label="整机工艺设计基线" value="整机工艺设计基线"></el-option>
                <el-option label="单板工艺设计基线" value="单板工艺设计基线"></el-option>
                <el-option label="PCB设计基线" value="PCB设计基线"></el-option>
                <el-option label="逻辑设计基线" value="逻辑设计基线"></el-option>
                <el-option label="平台架构设计-平台SE基线" value="平台架构设计-平台SE基线"></el-option>
                <el-option label="平台项目管理-平台PM基线" value="平台项目管理-平台PM基线"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitEditForm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ResearchPlatform',
  data() {
    return {
      searchKeyword: '', // 搜索关键词
      filteredTableData: [], // 过滤后的表格数据
      tableData: [], // 原始表格数据
      projectList: [], // 项目列表
      addDialogVisible: false, // 新增对话框显示状态
      editDialogVisible: false, // 编辑对话框显示状态

      // 新增表单数据
      addForm: {
        projectName: '',
        baselineType: '',
        productEquivalent: null,
        customProductEquivalent: null,
        productType: '', // commercial, jdm
        complexityCoefficient: null,
        engineeringQualification: null,
        customEngineeringQualification: null,
        projectTypeSelection: '', // commercial, whitebox
        // 散热设计基线特有字段
        basePower: null,
        // 单板工艺设计基线特有字段
        totalPins: null,
        borrowingRate: null,
        // PCB设计基线特有字段
        pcbComplexityCoefficient: null,
        pcbBorrowingRate: null,
        // 逻辑设计基线特有字段
        fpgaLines: null,
        logicComplexityCoefficient: null,
        logicComplexity: null
      },

      // 编辑表单数据
      editForm: {
        id: null,
        projectName: '',
        baselineType: '',
        productEquivalent: null,
        customProductEquivalent: null,
        productType: '',
        complexityCoefficient: null,
        engineeringQualification: null,
        customEngineeringQualification: null,
        projectTypeSelection: ''
      },

      // 计算结果数据
      calculatedData: {
        workload: '0.00',
        baseline: '0.00',
        tr1_tr3: '0.00',
        tr4: '0.00',
        tr4a: '0.00',
        tr5: '0.00',
        tr6: '0.00',
        ga: '0.00',
        rfq: '0.00',
        pd: '0.00',
        evt: '0.00',
        dvt: '0.00',
        pvt: '0.00',
        mp: '0.00'
      },

      // 编辑计算结果数据
      editCalculatedData: {
        workload: '0.00',
        baseline: '0.00',
        tr1_tr3: '0.00',
        tr4: '0.00',
        tr4a: '0.00',
        tr5: '0.00',
        tr6: '0.00',
        ga: '0.00',
        rfq: '0.00',
        pd: '0.00',
        evt: '0.00',
        dvt: '0.00',
        pvt: '0.00',
        mp: '0.00'
      },

      // 表单验证规则
      addFormRules: {
        projectName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        baselineType: [
          { required: true, message: '请选择基线类型', trigger: 'change' }
        ],
        productEquivalent: [
          { required: true, message: '请选择产品项目当量', trigger: 'change' }
        ],
        productType: [
          { required: true, message: '请选择产品类型', trigger: 'change' }
        ],
        complexityCoefficient: [
          { required: true, message: '请选择复杂度系数', trigger: 'change' }
        ],
        engineeringQualification: [
          { required: true, message: '请选择工程资质', trigger: 'change' }
        ],
        projectTypeSelection: [
          { required: true, message: '请选择项目类型', trigger: 'change' }
        ]
      },

      editFormRules: {
        projectName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ]
      }
    }
  },

  mounted() {
    // 获取所有项目名称
    this.getAllProjects()
    // 初始化时查询所有数据
    this.loadAllData()
  },

  watch: {
    // 监听表单字段变化，自动计算基线数据
    'addForm.productEquivalent'() {
      this.calculateBaseline()
    },
    'addForm.customProductEquivalent'() {
      this.calculateBaseline()
    },
    'addForm.productType'() {
      this.calculateBaseline()
    },
    'addForm.complexityCoefficient'() {
      this.calculateBaseline()
    },
    'addForm.engineeringQualification'() {
      this.calculateBaseline()
    },
    'addForm.customEngineeringQualification'() {
      this.calculateBaseline()
    },
    'addForm.projectTypeSelection'() {
      this.calculateBaseline()
    },
    'addForm.basePower'() {
      this.calculateBaseline()
    },
    'addForm.totalPins'() {
      this.calculateBaseline()
    },
    'addForm.borrowingRate'() {
      this.calculateBaseline()
    },
    'addForm.pcbComplexityCoefficient'() {
      this.calculateBaseline()
    },
    'addForm.pcbBorrowingRate'() {
      this.calculateBaseline()
    },
    'addForm.fpgaLines'() {
      this.calculateBaseline()
    },
    'addForm.logicComplexityCoefficient'() {
      this.calculateBaseline()
    },
    'addForm.logicComplexity'() {
      this.calculateBaseline()
    }
  },

  methods: {
    // 表格行样式
    tableRowClassName({row}) {
      return row.baselineType.toLowerCase().replace(/[^a-z0-9]/g, '-')
    },

    // 搜索数据
    searchData() {
      if (!this.searchKeyword.trim()) {
        this.loadAllData()
      } else {
        this.filterDataByKeyword(this.searchKeyword.trim())
      }
    },

    // 重置搜索
    resetSearch() {
      this.searchKeyword = ''
      this.loadAllData()
    },

    // 根据关键词过滤数据
    filterDataByKeyword(keyword) {
      const lowerKeyword = keyword.toLowerCase()
      this.filteredTableData = this.tableData.filter(item => {
        return (
          item.projectName.toLowerCase().includes(lowerKeyword) ||
          item.baselineType.toLowerCase().includes(lowerKeyword) ||
          (item.productType === 'commercial' ? '商用' : '白盒').toLowerCase().includes(lowerKeyword)
        )
      })
    },

    // 显示新增对话框
    showAddDialog() {
      this.addDialogVisible = true
    },

    // 显示编辑对话框
    showEditDialog(row) {
      this.editDialogVisible = true
      // 填充编辑表单数据
      this.editForm = {
        id: row.id,
        projectName: row.projectName,
        baselineType: row.baselineType,
        productEquivalent: row.productEquivalent,
        customProductEquivalent: row.customProductEquivalent,
        productType: row.productType,
        complexityCoefficient: row.complexityCoefficient,
        engineeringQualification: row.engineeringQualification,
        customEngineeringQualification: row.customEngineeringQualification,
        projectTypeSelection: row.projectTypeSelection
      }
    },

    // 基线类型变化处理
    onBaselineTypeChange() {
      // 重置所有相关字段
      this.addForm.productEquivalent = null
      this.addForm.customProductEquivalent = null
      this.addForm.productType = ''
      this.addForm.complexityCoefficient = null
      this.addForm.engineeringQualification = null
      this.addForm.customEngineeringQualification = null

      // 重置特殊字段
      this.addForm.basePower = null
      this.addForm.totalPins = null
      this.addForm.borrowingRate = null
      this.addForm.pcbComplexityCoefficient = null
      this.addForm.pcbBorrowingRate = null
      this.addForm.fpgaLines = null
      this.addForm.logicComplexityCoefficient = null
      this.addForm.logicComplexity = null

      // 重置计算结果
      this.calculatedData = {
        workload: '0.00',
        baseline: '0.00',
        tr1_tr3: '0.00',
        tr4: '0.00',
        tr4a: '0.00',
        tr5: '0.00',
        tr6: '0.00',
        ga: '0.00',
        rfq: '0.00',
        pd: '0.00',
        evt: '0.00',
        dvt: '0.00',
        pvt: '0.00',
        mp: '0.00'
      }
    },

    // 计算基线数据
    calculateBaseline() {
      if (!this.addForm.baselineType || !this.addForm.projectTypeSelection) {
        return
      }

      let baseline = 0
      let workload = 0

      // 根据不同基线类型使用不同的计算逻辑
      switch (this.addForm.baselineType) {
        case '结构设计基线':
        case '散热设计基线':
        case '整机工艺设计基线':
        case '平台架构设计-平台SE基线':
        case '平台项目管理-平台PM基线':
          baseline = this.calculateStandardBaseline()
          break
        case '单板工艺设计基线':
          baseline = this.calculateBoardBaseline()
          break
        case 'PCB设计基线':
          baseline = this.calculatePCBBaseline()
          break
        case '逻辑设计基线':
          baseline = this.calculateLogicBaseline()
          break
        default:
          return
      }

      if (baseline <= 0) {
        return
      }

      // 更新计算结果
      this.calculatedData.baseline = baseline.toFixed(2)
      this.calculatedData.workload = workload.toFixed(2)

      // 计算各阶段数据
      this.calculatePhaseData(baseline)
    },

    // 标准基线计算（结构设计、散热设计、整机工艺设计、平台SE、平台PM）
    calculateStandardBaseline() {
      if (!this.addForm.productEquivalent || !this.addForm.complexityCoefficient ||
          !this.addForm.engineeringQualification) {
        return 0
      }

      // 获取实际的产品项目当量值
      const productEquivalent = this.addForm.productEquivalent === 'custom'
        ? this.addForm.customProductEquivalent
        : this.addForm.productEquivalent

      // 获取实际的工程资质值
      const engineeringQualification = this.addForm.engineeringQualification === 'custom'
        ? this.addForm.customEngineeringQualification
        : this.addForm.engineeringQualification

      if (!productEquivalent || !engineeringQualification) {
        return 0
      }

      // 散热设计基线特殊处理
      if (this.addForm.baselineType === '散热设计基线' && this.addForm.basePower) {
        // 功耗系数计算 - 基于基准功率的比例
        const powerCoefficient = this.addForm.basePower / 1000 // 简化处理，将功率转换为系数
        const workload = productEquivalent * this.addForm.complexityCoefficient * powerCoefficient
        return workload * (12 / engineeringQualification)
      }

      // 标准计算
      const workload = productEquivalent * this.addForm.complexityCoefficient
      return workload * (12 / engineeringQualification)
    },

    // 单板工艺设计基线计算
    calculateBoardBaseline() {
      if (!this.addForm.totalPins || !this.addForm.complexityCoefficient || !this.addForm.borrowingRate) {
        return 0
      }

      // 基线 = (总PIN数/1000) × 复杂度系数 × (1-借用率) × 12/5
      const baseline = (this.addForm.totalPins / 1000) * this.addForm.complexityCoefficient *
                      (1 - this.addForm.borrowingRate) * (12 / 5)
      return baseline
    },

    // PCB设计基线计算
    calculatePCBBaseline() {
      if (!this.addForm.totalPins || !this.addForm.pcbComplexityCoefficient ||
          this.addForm.pcbBorrowingRate === null || this.addForm.pcbBorrowingRate === undefined) {
        return 0
      }

      // 基线 = (总PIN数/1000) × 复杂度系数 × (1-借用率) × 12/8
      const baseline = (this.addForm.totalPins / 1000) * this.addForm.pcbComplexityCoefficient *
                      (1 - this.addForm.pcbBorrowingRate) * (12 / 8)
      return baseline
    },

    // 逻辑设计基线计算
    calculateLogicBaseline() {
      if (!this.addForm.fpgaLines || !this.addForm.logicComplexityCoefficient ||
          !this.addForm.logicComplexity || !this.addForm.engineeringQualification) {
        return 0
      }

      // 获取实际的工程资质值
      const engineeringQualification = this.addForm.engineeringQualification === 'custom'
        ? this.addForm.customEngineeringQualification
        : this.addForm.engineeringQualification

      if (!engineeringQualification) {
        return 0
      }

      // 基线 = (FPGA行数/工程资质) × 复杂度系数 × 复杂度 × 12
      const baseline = (this.addForm.fpgaLines / engineeringQualification) *
                      this.addForm.logicComplexityCoefficient * this.addForm.logicComplexity * 12
      return baseline
    },

    // 计算各阶段数据
    calculatePhaseData(baseline) {
      const baselineNum = parseFloat(baseline)
      const { baselineType, projectTypeSelection } = this.addForm

      // 根据基线类型和项目类型计算各阶段比例
      let phaseRatios = this.getPhaseRatios(baselineType, projectTypeSelection)

      // 计算各阶段数值
      Object.keys(phaseRatios).forEach(phase => {
        this.calculatedData[phase] = (baselineNum * phaseRatios[phase]).toFixed(2)
      })
    },

    // 获取各阶段比例
    getPhaseRatios(baselineType, projectTypeSelection) {
      const ratios = {}

      if (projectTypeSelection === 'commercial') {
        // 商用项目阶段比例
        switch (baselineType) {
          case '结构设计基线':
            ratios.tr1_tr3 = 0.30
            ratios.tr4 = 0.43
            ratios.tr4a = 0.20
            ratios.tr5 = 0.05
            ratios.tr6 = 0.02
            ratios.ga = 0.00
            break
          case '散热设计基线':
            ratios.tr1_tr3 = 0.40
            ratios.tr4 = 0.30
            ratios.tr4a = 0.20
            ratios.tr5 = 0.07
            ratios.tr6 = 0.03
            ratios.ga = 0.00
            break
          case '整机工艺设计基线':
            ratios.tr1_tr3 = 0.10
            ratios.tr4 = 0.50
            ratios.tr4a = 0.15
            ratios.tr5 = 0.10
            ratios.tr6 = 0.15
            ratios.ga = 0.00
            break
          case '单板工艺设计基线':
            ratios.tr1_tr3 = 0.10
            ratios.tr4 = 0.50
            ratios.tr4a = 0.15
            ratios.tr5 = 0.10
            ratios.tr6 = 0.15
            ratios.ga = 0.00
            break
          case 'PCB设计基线':
            ratios.tr1_tr3 = 0.20
            ratios.tr4 = 0.75
            ratios.tr4a = 0.04
            ratios.tr5 = 0.01
            ratios.tr6 = 0.00
            ratios.ga = 0.00
            break
          case '逻辑设计基线':
            ratios.tr1_tr3 = 0.15
            ratios.tr4 = 0.40
            ratios.tr4a = 0.36
            ratios.tr5 = 0.05
            ratios.tr6 = 0.02
            ratios.ga = 0.02
            break
          case '平台架构设计-平台SE基线':
            ratios.tr1_tr3 = 0.50
            ratios.tr4 = 0.30
            ratios.tr4a = 0.14
            ratios.tr5 = 0.03
            ratios.tr6 = 0.03
            ratios.ga = 0.00
            break
          case '平台项目管理-平台PM基线':
            ratios.tr1_tr3 = 0.30
            ratios.tr4 = 0.40
            ratios.tr4a = 0.20
            ratios.tr5 = 0.05
            ratios.tr6 = 0.05
            ratios.ga = 0.00
            break
        }
      } else {
        // 白盒项目阶段比例
        switch (baselineType) {
          case '结构设计基线':
            ratios.rfq = 0.20
            ratios.pd = 0.20
            ratios.evt = 0.33
            ratios.dvt = 0.20
            ratios.pvt = 0.05
            ratios.mp = 0.02
            ratios.ga = 0.00
            break
          case '散热设计基线':
            ratios.rfq = 0.30
            ratios.pd = 0.10
            ratios.evt = 0.30
            ratios.dvt = 0.20
            ratios.pvt = 0.07
            ratios.mp = 0.03
            ratios.ga = 0.00
            break
          case '整机工艺设计基线':
            ratios.rfq = 0.10
            ratios.pd = 0.10
            ratios.evt = 0.40
            ratios.dvt = 0.15
            ratios.pvt = 0.10
            ratios.mp = 0.15
            ratios.ga = 0.00
            break
          case '单板工艺设计基线':
            ratios.rfq = 0.10
            ratios.pd = 0.10
            ratios.evt = 0.40
            ratios.dvt = 0.15
            ratios.pvt = 0.10
            ratios.mp = 0.15
            ratios.ga = 0.00
            break
          case 'PCB设计基线':
            ratios.rfq = 0.20
            ratios.pd = 0.10
            ratios.evt = 0.65
            ratios.dvt = 0.04
            ratios.pvt = 0.01
            ratios.mp = 0.00
            ratios.ga = 0.00
            break
          case '逻辑设计基线':
            ratios.rfq = 0.05
            ratios.pd = 0.10
            ratios.evt = 0.40
            ratios.dvt = 0.36
            ratios.pvt = 0.05
            ratios.mp = 0.02
            ratios.ga = 0.02
            break
          case '平台架构设计-平台SE基线':
            ratios.rfq = 0.40
            ratios.pd = 0.10
            ratios.evt = 0.30
            ratios.dvt = 0.14
            ratios.pvt = 0.03
            ratios.mp = 0.03
            ratios.ga = 0.00
            break
          case '平台项目管理-平台PM基线':
            ratios.rfq = 0.00
            ratios.pd = 0.25
            ratios.evt = 0.45
            ratios.dvt = 0.20
            ratios.pvt = 0.05
            ratios.mp = 0.05
            ratios.ga = 0.00
            break
        }
      }

      return ratios
    },

    // 获取白盒项目各阶段标签
    getWhiteboxRfqLabel(baselineType) {
      const labels = {
        '结构设计基线': 'RFQ (20%)',
        '散热设计基线': 'RFQ (30%)',
        '整机工艺设计基线': 'RFQ (10%)',
        '单板工艺设计基线': 'RFQ (10%)',
        'PCB设计基线': 'RFQ (20%)',
        '逻辑设计基线': 'RFQ (5%)',
        '平台架构设计-平台SE基线': 'RFQ (40%)',
        '平台项目管理-平台PM基线': 'RFQ (0%)'
      }
      return labels[baselineType] || 'RFQ'
    },

    getWhiteboxPdLabel(baselineType) {
      const labels = {
        '结构设计基线': 'PD (20%)',
        '散热设计基线': 'PD (10%)',
        '整机工艺设计基线': 'PD (10%)',
        '单板工艺设计基线': 'PD (10%)',
        'PCB设计基线': 'PD (10%)',
        '逻辑设计基线': 'PD (10%)',
        '平台架构设计-平台SE基线': 'PD (10%)',
        '平台项目管理-平台PM基线': 'PD (25%)'
      }
      return labels[baselineType] || 'PD'
    },

    getWhiteboxEvtLabel(baselineType) {
      const labels = {
        '结构设计基线': 'EVT (33%)',
        '散热设计基线': 'EVT (30%)',
        '整机工艺设计基线': 'EVT (40%)',
        '单板工艺设计基线': 'EVT (40%)',
        'PCB设计基线': 'EVT (65%)',
        '逻辑设计基线': 'EVT (40%)',
        '平台架构设计-平台SE基线': 'EVT (30%)',
        '平台项目管理-平台PM基线': 'EVT (45%)'
      }
      return labels[baselineType] || 'EVT'
    },

    getWhiteboxDvtLabel(baselineType) {
      const labels = {
        '结构设计基线': 'DVT (20%)',
        '散热设计基线': 'DVT (20%)',
        '整机工艺设计基线': 'DVT (15%)',
        '单板工艺设计基线': 'DVT (15%)',
        'PCB设计基线': 'DVT (4%)',
        '逻辑设计基线': 'DVT (36%)',
        '平台架构设计-平台SE基线': 'DVT (14%)',
        '平台项目管理-平台PM基线': 'DVT (20%)'
      }
      return labels[baselineType] || 'DVT'
    },

    getWhiteboxPvtLabel(baselineType) {
      const labels = {
        '结构设计基线': 'PVT (5%)',
        '散热设计基线': 'PVT (7%)',
        '整机工艺设计基线': 'PVT (10%)',
        '单板工艺设计基线': 'PVT (10%)',
        'PCB设计基线': 'PVT (1%)',
        '逻辑设计基线': 'PVT (5%)',
        '平台架构设计-平台SE基线': 'PVT (3%)',
        '平台项目管理-平台PM基线': 'PVT (5%)'
      }
      return labels[baselineType] || 'PVT'
    },

    getWhiteboxMpLabel(baselineType) {
      const labels = {
        '结构设计基线': 'MP (2%)',
        '散热设计基线': 'MP (3%)',
        '整机工艺设计基线': 'MP (15%)',
        '单板工艺设计基线': 'MP (15%)',
        'PCB设计基线': 'MP (0%)',
        '逻辑设计基线': 'MP (2%)',
        '平台架构设计-平台SE基线': 'MP (3%)',
        '平台项目管理-平台PM基线': 'MP (5%)'
      }
      return labels[baselineType] || 'MP'
    },

    // 获取商用项目各阶段标签
    getCommercialTr1Tr3Label(baselineType) {
      const labels = {
        '结构设计基线': 'TR1-TR3 (30%)',
        '散热设计基线': 'TR1-TR3 (40%)',
        '整机工艺设计基线': 'TR1-TR3 (10%)',
        '单板工艺设计基线': 'TR1-TR3 (10%)',
        'PCB设计基线': 'TR1-TR3 (20%)',
        '逻辑设计基线': 'TR1-TR3 (15%)',
        '平台架构设计-平台SE基线': 'TR1-TR3 (50%)',
        '平台项目管理-平台PM基线': 'TR1-TR3 (30%)'
      }
      return labels[baselineType] || 'TR1-TR3'
    },

    getCommercialTr4Label(baselineType) {
      const labels = {
        '结构设计基线': 'TR4 (43%)',
        '散热设计基线': 'TR4 (30%)',
        '整机工艺设计基线': 'TR4 (50%)',
        '单板工艺设计基线': 'TR4 (50%)',
        'PCB设计基线': 'TR4 (75%)',
        '逻辑设计基线': 'TR4 (40%)',
        '平台架构设计-平台SE基线': 'TR4 (30%)',
        '平台项目管理-平台PM基线': 'TR4 (40%)'
      }
      return labels[baselineType] || 'TR4'
    },

    getCommercialTr4aLabel(baselineType) {
      const labels = {
        '结构设计基线': 'TR4A (20%)',
        '散热设计基线': 'TR4A (20%)',
        '整机工艺设计基线': 'TR4A (15%)',
        '单板工艺设计基线': 'TR4A (15%)',
        'PCB设计基线': 'TR4A (4%)',
        '逻辑设计基线': 'TR4A (36%)',
        '平台架构设计-平台SE基线': 'TR4A (14%)',
        '平台项目管理-平台PM基线': 'TR4A (20%)'
      }
      return labels[baselineType] || 'TR4A'
    },

    getCommercialTr5Label(baselineType) {
      const labels = {
        '结构设计基线': 'TR5 (5%)',
        '散热设计基线': 'TR5 (7%)',
        '整机工艺设计基线': 'TR5 (10%)',
        '单板工艺设计基线': 'TR5 (10%)',
        'PCB设计基线': 'TR5 (1%)',
        '逻辑设计基线': 'TR5 (5%)',
        '平台架构设计-平台SE基线': 'TR5 (3%)',
        '平台项目管理-平台PM基线': 'TR5 (5%)'
      }
      return labels[baselineType] || 'TR5'
    },

    getCommercialTr6Label(baselineType) {
      const labels = {
        '结构设计基线': 'TR6 (2%)',
        '散热设计基线': 'TR6 (3%)',
        '整机工艺设计基线': 'TR6 (15%)',
        '单板工艺设计基线': 'TR6 (15%)',
        'PCB设计基线': 'TR6 (0%)',
        '逻辑设计基线': 'TR6 (2%)',
        '平台架构设计-平台SE基线': 'TR6 (3%)',
        '平台项目管理-平台PM基线': 'TR6 (5%)'
      }
      return labels[baselineType] || 'TR6'
    },

    // 新增表单的标签获取方法
    getAddWhiteboxRfqLabel() {
      return this.getWhiteboxRfqLabel(this.addForm.baselineType)
    },
    getAddWhiteboxPdLabel() {
      return this.getWhiteboxPdLabel(this.addForm.baselineType)
    },
    getAddWhiteboxEvtLabel() {
      return this.getWhiteboxEvtLabel(this.addForm.baselineType)
    },
    getAddWhiteboxDvtLabel() {
      return this.getWhiteboxDvtLabel(this.addForm.baselineType)
    },
    getAddWhiteboxPvtLabel() {
      return this.getWhiteboxPvtLabel(this.addForm.baselineType)
    },
    getAddWhiteboxMpLabel() {
      return this.getWhiteboxMpLabel(this.addForm.baselineType)
    },
    getAddCommercialTr1Tr3Label() {
      return this.getCommercialTr1Tr3Label(this.addForm.baselineType)
    },
    getAddCommercialTr4Label() {
      return this.getCommercialTr4Label(this.addForm.baselineType)
    },
    getAddCommercialTr4aLabel() {
      return this.getCommercialTr4aLabel(this.addForm.baselineType)
    },
    getAddCommercialTr5Label() {
      return this.getCommercialTr5Label(this.addForm.baselineType)
    },
    getAddCommercialTr6Label() {
      return this.getCommercialTr6Label(this.addForm.baselineType)
    },

    // 重置新增表单
    resetAddForm() {
      this.$refs.addForm && this.$refs.addForm.resetFields()
      this.addForm = {
        projectName: '',
        baselineType: '',
        productEquivalent: null,
        customProductEquivalent: null,
        productType: '',
        complexityCoefficient: null,
        engineeringQualification: null,
        customEngineeringQualification: null,
        projectTypeSelection: '',
        basePower: null,
        totalPins: null,
        borrowingRate: null,
        pcbComplexityCoefficient: null,
        pcbBorrowingRate: null,
        fpgaLines: null,
        logicComplexityCoefficient: null,
        logicComplexity: null
      }
      this.calculatedData = {
        workload: '0.00',
        baseline: '0.00',
        tr1_tr3: '0.00',
        tr4: '0.00',
        tr4a: '0.00',
        tr5: '0.00',
        tr6: '0.00',
        ga: '0.00',
        rfq: '0.00',
        pd: '0.00',
        evt: '0.00',
        dvt: '0.00',
        pvt: '0.00',
        mp: '0.00'
      }
    },

    // 重置编辑表单
    resetEditForm() {
      this.$refs.editForm && this.$refs.editForm.resetFields()
      this.editForm = {
        id: null,
        projectName: '',
        baselineType: '',
        productEquivalent: null,
        customProductEquivalent: null,
        productType: '',
        complexityCoefficient: null,
        engineeringQualification: null,
        customEngineeringQualification: null,
        projectTypeSelection: ''
      }
      this.editCalculatedData = {
        workload: '0.00',
        baseline: '0.00',
        tr1_tr3: '0.00',
        tr4: '0.00',
        tr4a: '0.00',
        tr5: '0.00',
        tr6: '0.00',
        ga: '0.00',
        rfq: '0.00',
        pd: '0.00',
        evt: '0.00',
        dvt: '0.00',
        pvt: '0.00',
        mp: '0.00'
      }
    },

    // 提交新增表单
    submitAddForm() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          // 检查是否已计算基线数据
          if (!this.calculatedData.baseline || this.calculatedData.baseline === '0.00') {
            this.$message.error('请先完善表单信息以自动计算基线数据！')
            return
          }

          // 准备发送到后端的数据
          const submitData = {
            project: this.addForm.projectName,
            baselineType: this.addForm.baselineType,
            productEquivalent: this.addForm.productEquivalent === 'custom'
              ? this.addForm.customProductEquivalent
              : this.addForm.productEquivalent,
            complexityCoefficient: this.addForm.complexityCoefficient,
            productType: this.addForm.productType,
            engineeringQualification: this.addForm.engineeringQualification === 'custom'
              ? this.addForm.customEngineeringQualification
              : this.addForm.engineeringQualification,
            projectTypeSelection: this.addForm.projectTypeSelection,
            baseline: this.calculatedData.baseline,
            phaseData: { ...this.calculatedData }
          }

          // 调用后端API保存数据
          this.RequestUtils.requestJsonWithPost('/research/baseline/save', submitData)
            .then(response => {
              // 处理成功响应
              if (response && response.code === 200) {
                // 重新加载数据
                this.loadAllData()

                // 关闭对话框并重置表单
                this.addDialogVisible = false
                this.resetAddForm()

                this.$message.success(response.data || '新增数据成功！')
              } else {
                this.$message.error(response.message || '保存失败，请重试！')
              }
            })
            .catch(error => {
              // 处理错误
              console.error('保存数据失败:', error)
              this.$message.error('保存失败，请检查网络连接或联系管理员！')
            })
        } else {
          this.$message.error('请填写完整信息！')
        }
      })
    },

    // 提交编辑表单
    submitEditForm() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          // 准备发送到后端的数据
          const submitData = {
            id: this.editForm.id,
            project: this.editForm.projectName,
            baselineType: this.editForm.baselineType,
            productEquivalent: this.editForm.productEquivalent,
            complexityCoefficient: this.editForm.complexityCoefficient,
            productType: this.editForm.productType,
            engineeringQualification: this.editForm.engineeringQualification,
            projectTypeSelection: this.editForm.projectTypeSelection,
            baseline: this.editCalculatedData.baseline,
            phaseData: { ...this.editCalculatedData }
          }

          // 调用后端API更新数据
          this.RequestUtils.requestJsonWithPost('/research/baseline/save', submitData)
            .then(response => {
              // 处理成功响应
              if (response && response.code === 200) {
                // 重新加载数据
                this.loadAllData()

                // 关闭对话框并重置表单
                this.editDialogVisible = false
                this.resetEditForm()

                this.$message.success(response.data || '编辑数据成功！')
              } else {
                this.$message.error(response.message || '更新失败，请重试！')
              }
            })
            .catch(error => {
              // 处理错误
              console.error('更新数据失败:', error)
              this.$message.error('更新失败，请检查网络连接或联系管理员！')
            })
        } else {
          this.$message.error('请填写完整信息！')
        }
      })
    },

    // 获取所有项目
    getAllProjects() {
      this.RequestUtils.requestWithGet('/hardware/baseline/getAllProject')
        .then(response => {
          if (response && response.code === 200) {
            this.projectList = response.data || []
          } else {
            this.$message.error(response.message || '获取项目列表失败')
          }
        })
        .catch(error => {
          console.error('获取项目列表失败:', error)
          this.$message.error('获取项目列表失败，请检查网络连接')
        })
    },

    // 加载所有基线数据
    loadAllData() {
      this.RequestUtils.requestWithGet('/research/baseline/queryAll')
        .then(response => {
          if (response && response.code === 200) {
            this.tableData = this.formatTableData(response.data || [])
            this.filteredTableData = [...this.tableData]
          } else {
            this.$message.error(response.message || '获取基线数据失败')
          }
        })
        .catch(error => {
          console.error('获取基线数据失败:', error)
          this.$message.error('获取基线数据失败，请检查网络连接')
        })
    },

    // 格式化表格数据
    formatTableData(data) {
      return data.map(item => {
        return {
          id: item.id,
          projectName: item.project,
          baselineType: item.baselineType,
          productEquivalent: item.productEquivalent,
          complexityCoefficient: item.complexityCoefficient,
          engineeringQualification: item.engineeringQualification,
          productType: item.productType,
          projectTypeSelection: item.projectTypeSelection,
          phaseData: item.phaseData || {}
        }
      })
    }
  }
}
</script>

<style scoped>
.research-platform {
  padding: 20px;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.search-section {
  display: flex;
  align-items: center;
}

.action-section {
  display: flex;
  gap: 10px;
}

.child-table-container {
  padding: 20px;
  background-color: #fafafa;
}

.platform-info {
  margin-bottom: 15px;
  padding: 10px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #e6e6e6;
}

.platform-label, .pin-label {
  font-weight: bold;
  color: #606266;
  margin-right: 8px;
}

.platform-value, .pin-value {
  color: #409EFF;
  font-weight: bold;
  margin-right: 20px;
}

.baseline-value {
  font-weight: bold;
  color: #E6A23C;
  font-size: 14px;
}

.percentage {
  color: #67C23A;
  font-weight: bold;
}

.baseline-data-container {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #DCDFE6;
  border-radius: 4px;
  background-color: #fafafa;
}

.dialog-footer {
  text-align: right;
}

/* 表格行样式 */
.el-table .结构设计基线 {
  background-color: #f0f9ff;
}

.el-table .散热设计基线 {
  background-color: #fff7ed;
}

.el-table .整机工艺设计基线 {
  background-color: #f0fdf4;
}

.el-table .单板工艺设计基线 {
  background-color: #fef7f0;
}

.el-table .pcb设计基线 {
  background-color: #f3f4f6;
}

.el-table .逻辑设计基线 {
  background-color: #faf5ff;
}

.el-table .平台架构设计-平台se基线 {
  background-color: #ecfdf5;
}

.el-table .平台项目管理-平台pm基线 {
  background-color: #fef3c7;
}
</style>