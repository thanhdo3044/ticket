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
      <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="Loại ticket" required>
          <a-select v-model:value="modelRef.region" placeholder="--Chọn thông tin lỗi --">
            <a-select-option value="shanghai">Zone one</a-select-option>
            <a-select-option value="beijing">Zone two</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Tên ticket" required>
          <a-input v-model:value="modelRef.name" />
        </a-form-item>
        <a-form-item label="Chi tiết" required>
          <a-textarea v-model:value="modelRef.chit" />
        </a-form-item>
        <a-form-item class="error-infos button-uers-tickter" v-bind="errorInfos">
          <a-button class="button-uers-tickter-color">Hủy</a-button>
          <!-- <a-button class="button-uers-tickter-color" style="margin-left: 10px"  @click="resetFields">Reset</a-button> -->
          <a-button class="button-uers-tickter-color color-button-ticker" style="margin-left: 10px"
            @click.prevent="onSubmit">Gửi</a-button>
        </a-form-item>
        <a-form-item>
          <a-upload :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload">
      <a-button>
        <upload-outlined></upload-outlined>
        Select File
      </a-button>
    </a-upload>
    <a-button
      type="primary"
      :disabled="fileList.length === 0"
      :loading="uploading"
      style="margin-top: 16px"
      @click="handleUpload"
    >
      {{ uploading ? 'Uploading' : 'Start Upload' }}
    </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import RemoverTicker from "../../components/RemoverTicker.vue";

// import { message } from 'ant-design-vue';
// import { UploadOutlined } from '@ant-design/icons-vue';
import { reactive, toRaw, computed, defineComponent, ref } from 'vue';
import { toArray } from 'lodash-es';
import { Form } from 'ant-design-vue';

const useForm = Form.useForm;
// export default {
//     components: {
//         RemoverTicker
//     },

// }




export default defineComponent({
  components: {
    RemoverTicker,
    // UploadOutlined
  },
  setup() {
    const modelRef = reactive({
      name: '',
      region: undefined,
      type: [],
    });
    const rulesRef = reactive({
      name: [
        {
          required: true,
          message: 'Please input name',
        },
      ],
      region: [
        {
          required: true,
          message: 'Please select region',
        },
      ],
    });
    const { resetFields, validate, validateInfos, mergeValidateInfo } = useForm(modelRef, rulesRef);
    const onSubmit = () => {
      validate()
        .then(() => {
          console.log("Hien thi data:", toRaw(modelRef));
        })
        .catch(err => {
          console.log('error', err);
        });
    };
    const errorInfos = computed(() => {
      return mergeValidateInfo(toArray(validateInfos));
    });
    const fileList = ref([]);
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      validateInfos,
      resetFields,
      modelRef,
      onSubmit,
      errorInfos,
      fileList,
      headers: {
        authorization: 'authorization-text',
      },
    };
    // const handleChange = (info: FileInfo) => {
    //   if (info.file.status !== 'uploading') {
    //     console.log(info.file, info.fileList);
    //   }
    //   if (info.file.status === 'done') {
    //     message.success(`${info.file.name} file uploaded successfully`);
    //   } else if (info.file.status === 'error') {
    //     message.error(`${info.file.name} file upload failed.`);
    //   }
    // };

    // const fileList = ref([]);
    // return {
    //   fileList,
    //   headers: {
    //     authorization: 'authorization-text',
    //   },
    //   handleChange,
    // };
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
  bottom: 0;
  margin-right: 16px;
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
</style>