<template>
  <div class="user-view-tickter">
    <div @click="this.$router.push('/departmentticket')">
      <RemoverTicker />
    </div>
    <div class="title-uers-tickter">
      <a-row>
        <a-col>
          <p>Tạo ticket </p>
        </a-col>
      </a-row>
    </div>
    <div class="form-ticket-content">
      <a-form :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rulesRef" :model="modelRef">
        <a-form-item label="Loại ticket" v-bind="validateInfos.loaiTicket" >
          <a-select v-model:value="modelRef.loaiTicket" placeholder="--Chọn thông tin loại --">
            <a-select-option value="BaoLoi">Báo lỗi</a-select-option>
            <a-select-option value="DeXuat">Đề xuất</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="Hạng mục" v-bind="validateInfos.hangMuc">
          <a-select v-model:value="modelRef.hangMuc" mode="tags" placeholder="--Chọn hạng mục --">
            <a-select-option value="Woodslang">Woodslang</a-select-option>
            <a-select-option value="CongTrinh">Công trình</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="Phòng ban" v-bind="validateInfos.phongBan">
          <a-select v-model:value="modelRef.phongBan" placeholder="--Chọn tên phòng ban --" mode="tags">
            <a-select-option value="PhongSoHoa">Phòng số hóa</a-select-option>
            <a-select-option value="PhongKeToan">Phòng kế toán</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="Độ quan trọng" v-bind="validateInfos.quanTrong">
          <a-select v-model:value="modelRef.quanTrong" placeholder="--Chọn mức quan trọng --">
            <a-select-option value="QT">Quan Trọng</a-select-option>
            <a-select-option value="TB">Trung Bình</a-select-option>
            <a-select-option value="KQT">Thấp</a-select-option>
          </a-select>
        </a-form-item>


        <a-form-item label="Tên ticket" v-bind="validateInfos.tenTicket">
          <a-input v-model:value="modelRef.tenTicket" />
        </a-form-item>
        <a-form-item label="Chi tiết" v-bind="validateInfos.chiTiet">
          <a-textarea class="textarea-node" v-model:value="modelRef.chiTiet" />
        </a-form-item>

        <a-form-item name="upload" label="Ảnh hoành thành file đính kèm" >
      <a-upload
      v-model="modelRef.upload"
        name="upload"
        
        action=""
        accept=".png,.jpg,.svg,.docx,.pdf,.xlsx,.JPG,.JPEG,.GIF,.MP4,.AVI,.MKV,.WMV,.VOB,.FLV,.DIvX"
      >
        <a-button>
          <template #icon><UploadOutlined /></template>
          Click to upload
        </a-button>
      </a-upload>
    </a-form-item>
        
        <a-form-item class=" button-uers-tickter">
          <a-button class="button-uers-tickter-color">Hủy</a-button>
          <!-- <a-button class="button-uers-tickter-color" style="margin-left: 10px"  @click="resetFields">Reset</a-button> -->
          <a-button class="button-uers-tickter-color color-button-ticker" style="margin-left: 10px" @click="onSubmit" v-bind="errorInfos">
            Gửi
          </a-button>
        </a-form-item>
      </a-form>
    </div>
    <MessageTicker />
  </div>
</template>       

<script>
import RemoverTicker from "../../components/RemoverTicker.vue";
import MessageTicker from "@/components/MessageTicker.vue";
// import { UploadOutlined } from '@ant-design/icons-vue';

// import { message } from 'ant-design-vue';
// import { UploadOutlined } from '@ant-design/icons-vue';
import { reactive, toRaw, computed, defineComponent } from 'vue';
import { toArray } from 'lodash-es';
import { Form } from 'ant-design-vue';

const useForm = Form.useForm;


export default defineComponent({
  components: {
    RemoverTicker,
    MessageTicker,
    // UploadOutlined,
  },
  setup() {
    const modelRef = reactive({
      loaiTicket: undefined,
      hangMuc: undefined,
      phongBan: undefined,
      quanTrong: undefined,
      tenTicket: '',
      chiTiet: '',
      upload:'',
      // region: undefined,
      type: [],
    });
    const rulesRef = reactive({
      loaiTicket: [
        {
          required: true,
          message: 'Vui lòng chọn loại ticker',
        },
      ],
      hangMuc: [
        {
          required: true,
          message: 'Vui lòng chọn hạng mục ticker',
        },
      ],
      phongBan: [
        {
          required: true,
          message: 'Vui lòng chọn phòng ban ticker',
        },
      ],
      quanTrong: [
        {
          required: true,
          message: 'Vui lòng chọn độ quan trọng ticker',
        },
      ],
      tenTicket: [
        {
          required: true,
          message: 'Vui lòng chọn độ quan trọng ticker',
        },
      ],
      chiTiet: [
        {
          required: true,
          message: 'Vui lòng chọn độ quan trọng ticker',
        },
      ],

      // region: [
      //   {
      //     required: true,
      //     message: 'Please select region',
      //   },
      // ],
    });
    const { validate, validateInfos, mergeValidateInfo } = useForm(modelRef, rulesRef);
    const onSubmit = () => {
      validate()
        .then(() => {
          console.log("Hien thi data:", toRaw(modelRef));
        })
        .catch(err => {
          console.log('error', err);
          computed(()=> mergeValidateInfo(toArray(validateInfos)))
        });
        
    };
    const errorInfos = computed(() => {
      return mergeValidateInfo(toArray(validateInfos));
    });
    
    return {
      rulesRef,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      validateInfos,
      // resetFields,
      modelRef,
      onSubmit,
      errorInfos,
      headers: {
        authorization: 'authorization-text',
      },
    };
  },

});

</script>

<style scoped>
.user-view-tickter {
  margin-top: 31px;
  margin-left: 20px;
}

.title-uers-tickter p {
  font-size: 32px;
}

.form-ticket-content {
  margin-right: 16px;
}

.button-uers-tickter {
  position: absolute;
  right: 0;
  /* bottom: 0; */
  padding-right: 16px;
  padding-bottom: 30px;
  
}

.button-uers-tickter-color {
  color: #000;
  font-size: 20px;
  width: 116px;
  height: 47px;
}

.color-button-ticker {
  background-color: #0BB588;
  color: #fff;
}


.textarea-node {
  height: 120px;
}
</style>