<template>
  <div style="display: flex; margin:auto; justify-content: space-around;">
    <div>
      <h1>To-do-list: [{{baseData.length - uniqueStatuses.length}}]</h1>
      <!-- <h2>{{uniqueStatuses}}</h2> -->
    </div>
    <div>
      <ul id="完了" style="display: block; background: red; width:200px; aspect-ratio: 3/1; position:relative; padding:0">
        <strong style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);">完了:[{{filteredData[6]?.length-1}}]</strong>
      </ul>
    </div>

  </div>

  <div class="wrapper"> 


    <template v-for="(num, index) in uniqueStatuses" :key="index">
      <ul
        :id="uniqueStatuses[index]"
        :ref="`ulElement-${index}`"
        @drop="dropFunction($event)"
        @dragover="dragOverFunction($event)"
        v-if="uniqueStatuses[index] !== '完了'"
      >
        <span class="status-title" :style="{ backgroundColor: statusColors[index] }">{{ uniqueStatuses[index] }}</span>{{ filteredData[index].length - 1 }}
        <draggable
          animation="300"
          v-model="filteredData[index]"
          :group="test"
          :itemKey="item => item.title"
          :data-status="index"
          v-bind="dragOptions"
        >
          <template #item="{ element }">
            <li
              v-if="!element.hidden"
              @dragstart="startFunction(element)"
              @dragend="endFunction($event, element)"
              :style="{ background: priorityColors[element.priority - 1] }"

            >
              {{ element.title }}<br>
              <!-- <span style="color:black; font-weight:bold">{{element.priority}}</span> -->
              <span v-for="n in element.priority" :key="n">&#11088;</span> <!-- Here's the star part -->
            </li>
          </template>
        </draggable>
      </ul>
    </template>
    






  </div>

</template>

<script>
import draggable from 'vuedraggable'
// import Sortable from 'sortablejs'

export default {
  title: 'App',
  data(){
    return{
      baseData:[
        {
          "title": "リソル（モーダル、らんきんぐ）",
          "createdAt": "2023年7月4日 10:05",
          "deadline": "",
          "duration": "",
          "priority": 5,
          "status": "完了",
        },
        {
          "title": "花人日和(team soさんに連絡)",
          "createdAt": "2023年6月29日 16:00",
          "deadline": "",
          "duration": "",
          "priority": 5,
          "status": "完了",
        },
        {
          "title": "NIPPI複製　500ページくら",
          "createdAt": "2023年6月23日 11:01",
          "deadline": "2023年6月29日",
          "duration": 240,
          "priority": 5,
          "status": "完了",
        },
        {
          "title": "NIPPIさんの対応",
          "createdAt": "2023年6月30日 15:57",
          "deadline": "",
          "duration": 60,
          "priority": 5,
          "status": "完了",
        },
        {
          "title": "T-シャツ　本番公開\nTOP更新",
          "createdAt": "2023年6月29日 12:57",
          "deadline": "",
          "duration": 30,
          "priority": 5,
          "status": "完了",
        },
        {
          "title": "DX修正",
          "createdAt": "2023年6月29日 10:10",
          "deadline": "",
          "duration": "",
          "priority": 5,
          "status": "完了",
        },
        {
          "title": "トートバッグ修正",
          "createdAt": "2023年6月29日 14:12",
          "deadline": "",
          "duration": "",
          "priority": 5,
          "status": "完了",
        },
        {
          "title": "リソルアップ",
          "createdAt": "2023年6月29日 10:10",
          "deadline": "",
          "duration": "",
          "priority": 5,
          "status": "完了",
        },
        {
          "title": "リソルアップ",
          "createdAt": "2023年6月28日 12:18",
          "deadline": "",
          "duration": 15,
          "priority": 5,
          "status": "完了",
        },
        {
          "title": "サライの下阪データ",
          "createdAt": "2023年6月28日 10:30",
          "deadline": "",
          "duration": 20,
          "priority": 5,
          "status": "完了",
        },
        {
          "title": "ものたろう　https://sfcdev.backlog.jp/view/PIX-32414#comment-102340376",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "2023年6月21日",
          "duration": 45,
          "priority": 5,
          "status": "完了",
        },
        {
          "title": "DIMEのメルマガ",
          "createdAt": "2023年6月28日 10:30",
          "deadline": "",
          "duration": 15,
          "priority": 5,
          "status": "完了",
        },
        {
          "title": "リソルアップ",
          "createdAt": "2023年6月27日 9:58",
          "deadline": "",
          "duration": 60,
          "priority": 4,
          "status": "完了",
        },
        {
          "title": "ものたろうウェビナー本番公開（一蘭は、テキストスタイルずれるから柳瀬さんにやってもらう）",
          "createdAt": "2023年6月28日 10:48",
          "deadline": "",
          "duration": 30,
          "priority": 4,
          "status": "完了",
        },
        {
          "title": "サライの写真",
          "createdAt": "2023年7月4日 10:12",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "nippiさん確認",
          "createdAt": "2023年6月30日 12:36",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "写真のCSVアップ",
          "createdAt": "2023年7月4日 11:48",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "小プロ　タスク確認",
          "createdAt": "2023年7月4日 11:19",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "花人日和　メルマガ今日配信",
          "createdAt": "2023年6月30日 10:37",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "父の日商品制作（栗屋さｎまち）",
          "createdAt": "2023年6月23日 12:00",
          "deadline": "",
          "duration": 30,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "ものたろう導入事例、他のものたろうもチェック！",
          "createdAt": "2023年6月21日 15:56",
          "deadline": "2023年6月23日",
          "duration": 30,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "TシャツLP",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "2023年7月1日",
          "duration": 180,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "父の日　再々追加　リッチ化",
          "createdAt": "2023年6月22日 18:52",
          "deadline": "",
          "duration": 30,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "サライ制作、team so さんに連らk",
          "createdAt": "2023年6月26日 10:46",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "リソル削除",
          "createdAt": "2023年6月27日 9:58",
          "deadline": "",
          "duration": 15,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "優先度をつける",
          "createdAt": "2023年6月27日 10:58",
          "deadline": "",
          "duration": 10,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "藝大アート　新商品制作　確認",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 30,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "配完処理",
          "createdAt": "2023年6月26日 10:04",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "父の日LP　プレビューで",
          "createdAt": "2023年6月22日 15:24",
          "deadline": "",
          "duration": 30,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "softcom dx 対応",
          "createdAt": "2023年6月23日 10:03",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "父の日追加商品",
          "createdAt": "2023年6月21日 18:53",
          "deadline": "",
          "duration": 30,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "サイズ表と修正を直す（父の日）",
          "createdAt": "2023年6月22日 12:50",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "かにさんのBacklog",
          "createdAt": "2023年6月22日 11:37",
          "deadline": "",
          "duration": 45,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "送料無料　修正",
          "createdAt": "2023年6月23日 12:00",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "父の日LP本番公開",
          "createdAt": "2023年6月21日 15:56",
          "deadline": "",
          "duration": 30,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "ニッピLP岡野さんにきく",
          "createdAt": "2023年6月22日 18:20",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "百貨店TＯＰ更新",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 10,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "【名刺】川上さんからもらってから",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 60,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "送料無料キャンペーンLP修正PC　それとSP開始",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "2023年6月19日",
          "duration": 150,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "岡野さんにリンクのぱらめー",
          "createdAt": "2023年6月22日 18:54",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "送料無料メルマガ対応（岡野さんに対応方法確認する）",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 30,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "名刺リマインダ　机の上に！",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "2023年6月8日",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "メルマガ名刺",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "2023年6月9日",
          "duration": 120,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "7/3お休み頂く",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "2023年6月9日",
          "duration": 5,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "望月さんへの分類依頼　ストンアート",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "2023年6月9日",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "リッチ化",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "2023年6月9日",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "他の父の日の赤字を、トートバッグにも記入",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "2023年6月9日",
          "duration": 10,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "商品制作最初に！",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "2023年6月9日",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "B to Bサイト向け更新　https://sfcdev.backlog.jp/view/PIX-32539",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "2023年6月12日",
          "duration": 30,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "サライブログメディア",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "2023年6月13日",
          "duration": 45,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "Time Crowd",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "2023年6月13日",
          "duration": 15,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "望月さんのコーディング　火曜の夕方まで",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "2023年6月13日",
          "duration": 45,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "DIMEの詳細ページ",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "2023年6月14日",
          "duration": 60,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "望月さんに、藝大カテゴリー依頼をする",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "2023年6月15日",
          "duration": 10,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "藝大の商品追加",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "2023年6月16日",
          "duration": 90,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "メルマガ　テンプレ　コーディング",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "2023年6月30日",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "リソル（メンテナンス）",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 20,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "Photoshop AI",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "父の日本番アップ、LP編集",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 30,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "メルマガとかタスク確認",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 30,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "望月さんに父の日分類を依頼する",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 5,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "DIME　QRコード",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 10,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "DIMEのブログメディア",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 15,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "配管処理",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 10,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "Hot drink",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "DIMEブログメディア",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 30,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "全てのLPの状況を確認しておく",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "リソル確認",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "メルマガ修正",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 10,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "父の日、新商品フォルダーに追加",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 10,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "DIME リリース対応",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 5,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "ストンアートのリッチ化",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 30,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "ストーンアート　アップ準備",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "8月のBE-PALの対応、QR棟など",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "サライお取り寄せ",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "メルマガECストーンアート",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "15時「父の日遅れてごめんね」上書きする",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "notion how to add color to properety",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "ストーンアート（最悪火曜日）",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 120,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "朝アップ",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "ストーンアートリッチ化",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 30,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "ものたろう確認",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 10,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "＠DIME変更う",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 15,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "@DIME　公開準備",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 15,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "父の日の詳細ページ（トートバッグ",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 60,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "ニッピ　https://sfcdev.backlog.jp/view/PIX-32504",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 60,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "リソル確認",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "父の日　森のカバン確認",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "DIMEの担当確認",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "メルマガ確認",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "配完処理確認",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "6/13まで！　商品制作https://shopro-ec.backlog.jp/view/PALSHOP-4627　https://sfcdev.backlog.jp/view/PIX-32507#comment-102552812",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 45,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "softcomDX：さーバーサイドPHPアップグレード",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 30,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "spotifyのDJアップ",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 60,
          "priority": "",
          "status": "またいつか",
        },
        {
          "title": "The way of zen",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "またいつか",
        },
        {
          "title": "softocomDXスクレイピングのところのマニュアル",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 30,
          "priority": "",
          "status": "またいつか",
        },
        {
          "title": "公開対応　Be-pal　サライ7月公開",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 15,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "SFCコーポレートサイト　ヘッダー",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 60,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "コーポレートサイト修正と本番アップ",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 30,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "山田さんにfirebaseのこと聞く",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 15,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "本番でキュレーション",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "リソル、リモートにアップ",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 5,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "LPアップ16：00",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "小プロ再公開のマニュアル作成",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 15,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "BE-PALサライ公開対応",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "リソルさんの対応マニュアル（Dojo使って）",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 60,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "リソルランキングHTML更新",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 60,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "配完処理",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 15,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "尾形さんレクチャー",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 30,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "もう一回wikikiテスト",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "サライ作成　あした公開OKかどうか",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 20,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "伊藤忠オリコ保険",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "Wikikiの対応マニュアル",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "小プロ　https://shopro-ec.backlog.jp/view/PALSHOP-4532#comment-186724665",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 15,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "tab timer",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "Notionのテンプレートをどうやって複製するのか",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 15,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "タスク確",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 30,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "AWS 認定試験 & トレーニング",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": "",
          "priority": 4,
          "status": "未着手",
        },
        {
          "title": "テンプレートの出力方法確認",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 120,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "BE-PAL作成",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "望月さんコーディングhttps://sfcdev.backlog.jp/view/PIX-32427",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 30,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "伊藤忠オリコ保険リンクどれが正しいの？",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "QRコード対応",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 15,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "BE-PAL動画掲載",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "望月さんにカテゴリのお願い（積み木）",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "公開日変更",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 15,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "リソルコーポレートサイト　更新マニュアル作成",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 15,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "LPのテンプレートを作成",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 60,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "Notion日報管理",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 60,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "藝大写真更新",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 15,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "父の日LP",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "完了",
        },
        {
          "title": "花人日和商品追加",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 60,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "QRコード完成",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 5,
          "priority": "",
          "status": "完了",
        },
        {
          "title": "ドメイン、サーバーの勉強、ask chtatGPT",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 30,
          "priority": 3,
          "status": "未着手",
        },
        {
          "title": "notionっぽいアプリ作る",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 45,
          "priority": "",
          "status": "またいつか",
        },
        {
          "title": "BE-PALチェック　→　SLACK報告　→　Backlogで報告",
          "createdAt": "2023年7月4日 11:50",
          "deadline": "",
          "duration": 30,
          "priority": 5,
          "status": "待機中",
        },
        {
          "title": "メイドイン商品登録（既存商品のBK対応）",
          "createdAt": "2023年6月27日 12:57",
          "deadline": "2023年6月30日",
          "duration": 120,
          "priority": 4,
          "status": "待機中",
        },
        {
          "title": "サライ（本誌）の商品登録",
          "createdAt": "2023年6月28日 10:29",
          "deadline": "2023年7月4日",
          "duration": 60,
          "priority": 5,
          "status": "対応中",
        },
        {
          "title": "花人日和商品数確認",
          "createdAt": "2023年7月4日 13:11",
          "deadline": "",
          "duration": 15,
          "priority": "",
          "status": "対応中",
        },
        {
          "title": "腕時計　商品制作",
          "createdAt": "2023年6月23日 10:35",
          "deadline": "",
          "duration": "",
          "priority": 4,
          "status": "今日絶対",
        },
        {
          "title": "ものたろう確認",
          "createdAt": "2023年6月29日 18:31",
          "deadline": "",
          "duration": "",
          "priority": 2,
          "status": "今日絶対",
        },
        {
          "title": "花人日和　商品制作",
          "createdAt": "2023年6月30日 12:33",
          "deadline": "",
          "duration": "",
          "priority": 2,
          "status": "今日絶対",
        },
        {
          "title": "望月さんのコーディング",
          "createdAt": "2023年7月4日 10:12",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "今日絶対",
        },
        {
          "title": "BOWWOWチェック",
          "createdAt": "2023年7月4日 11:48",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "今日絶対",
        },
        {
          "title": "8/4お休み取る",
          "createdAt": "2023年7月4日 12:42",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "今日絶対",
        },
        {
          "title": "腕時計企画LP制作（7月公開）",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "2023年6月22日",
          "duration": 150,
          "priority": "",
          "status": "待機中",
        },
        {
          "title": "休日時計　分類インポート終わり（本番公開待ち）",
          "createdAt": "2023年7月4日 10:35",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "待機中",
        },
        {
          "title": "メイドインニッポン\nリッチ化（２商品のみ）",
          "createdAt": "2023年6月30日 11:09",
          "deadline": "2023年7月11日",
          "duration": "",
          "priority": 4,
          "status": "すぐ",
        },
        {
          "title": "カレンダー商品追加（リッチ化もあり）",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "2023年7月11日",
          "duration": 30,
          "priority": 2,
          "status": "すぐ",
        },
        {
          "title": "リッチ化早めに、",
          "createdAt": "2023年6月29日 18:48",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "すぐ",
        },
        {
          "title": "腕時計、カテゴリーリンク登録",
          "createdAt": "2023年6月26日 11:11",
          "deadline": "",
          "duration": 30,
          "priority": "",
          "status": "すぐ",
        },
        {
          "title": "時計３商品のリッチ化",
          "createdAt": "2023年6月30日 12:36",
          "deadline": "",
          "duration": 60,
          "priority": "",
          "status": "すぐ",
        },
        {
          "title": "Bownow　google docsにまとめる",
          "createdAt": "2023年6月20日 18:55",
          "deadline": "",
          "duration": 30,
          "priority": 2,
          "status": "未着手",
        },
        {
          "title": "nippさんのマニュアル作成方法",
          "createdAt": "2023年6月28日 11:46",
          "deadline": "",
          "duration": "",
          "priority": 1,
          "status": "未着手",
        },
        {
          "title": "reserach about the gtm variables",
          "createdAt": "2023年6月27日 10:30",
          "deadline": "",
          "duration": "",
          "priority": 5,
          "status": "未着手",
        },
        {
          "title": "サライリッチ化（４商品？）",
          "createdAt": "2023年7月4日 12:26",
          "deadline": "",
          "duration": "",
          "priority": "",
          "status": "すぐ",
        },
      ],
      draggedItemTitle: undefined,
      currentTarget: undefined,
      dragStartIndex: null,

      droppedUlId: null,
      isDragging: false,
      
      statusColors:["rgb(55, 55, 55)","rgb(110, 54, 48)","rgb(40, 69, 108)","#646464","rgb(137, 99, 42)","rgb(55, 55, 55)","rgb(43, 89, 63)",],
      // priorityColors:["#3b633b", "#616e20", "#8b8200", "#8b5400", "#8b0000"],
      priorityColors:["#406a6a", "#296b5b", "#188b43", "#8b6918", "#8b0000"],
      
    }
  },
  components: {
    draggable: draggable
  },
  methods: {

    startFunction(element) {
      // Code to execute when the dragging starts
      // console.log('Dragging started');
      // Access element properties if needed
      // console.log('Element title:', element.title);
      this.isDragging = element
    },
    endFunction(event,element) {
      this.isDragging = false
      // Code to execute when the dragging ends
      // console.log('Dragging ended');
      
      // const ulElements = this.$refs;
      const ulElements = document.querySelectorAll('ul');

      // console.log(ulElements);
      const dropPointX = event.clientX;
      const dropPointY = event.clientY;
      
      let droppedUlId;

      // for (const key in ulElements) {
      //   if (key.startsWith('ulElement-')) {
      //     const ulElement = ulElements[key][0];
      //     const rect = ulElement.getBoundingClientRect();
      //     const { top, left, bottom, right } = rect;
          
      //     // Check if dropPoint is within the current <ul>'s area
      //     if (dropPointX >= left && dropPointX <= right && dropPointY >= top && dropPointY <= bottom) {
      //       droppedUlId = ulElement.id;
      //       break;
      //     }
      //   }
      // }

      ulElements.forEach((ulElement) => {
        const rect = ulElement.getBoundingClientRect();
        const { top, left, bottom, right } = rect;

        // Check if dropPoint is within the current <ul>'s area
        if (dropPointX >= left && dropPointX <= right && dropPointY >= top && dropPointY <= bottom) {
          droppedUlId = ulElement.id;
          return; // Exit the loop if a match is found
        }
      });
      
      if (droppedUlId) {
        console.log(`The draggable item was dropped into the <ul> with ID: ${droppedUlId}`);
        // console.log(element.status);
        element.status = droppedUlId
        element.completedAt = Math.floor(Date.now() / 1000); 
        // console.log(element.completedAt);

      } else {
        console.log('The draggable item was not dropped into any <ul>');
      }
    },

    dropFunction(event) {
      // Prevent default behavior when an item is dropped
      event.preventDefault();
    },
    dragOverFunction(event) {
      // Prevent default behavior when dragging over the <ul> element
      event.preventDefault();
    },

    dragChange(event){
      console.log(`Item moved from index ${event.moved.oldIndex} in list ${event.moved.from} to index ${event.moved.newIndex} in list ${event.moved.to}`);
    },

    test(info){
      this.currentTarget= info
      // console.log(info);
    }
  },
  computed:{
    uniqueStatuses() {
        // const statuses = this.baseData.map(item => item.status);
        // const uniqueStatusSet = new Set(statuses);
        // const allStatuses = Array.from(uniqueStatusSet);
        // return allStatuses;

        const statuses = this.baseData.map(item => item.status);
        const uniqueStatusSet = new Set(statuses);
        let allStatuses = Array.from(uniqueStatusSet);

        // Define the desired order
        const sortOrder = ['またいつか', '未着手', 'すぐ', '今日絶対', '対応中', '待機中', '完了'];

        // Sort the array based on the sortOrder
        allStatuses.sort((a, b) => sortOrder.indexOf(a) - sortOrder.indexOf(b));

        return allStatuses;
    },
    
    // filteredData() {
    //   let result = [];
    //   for (let status of this.uniqueStatuses) {
    //     result.push(this.baseData.filter(item => item.status === status));
    //   }
    //   return result;
    // },
    filteredData() {
  let result = [];
  for (let status of this.uniqueStatuses) {
    const filteredItems = this.baseData.filter(item => item.status === status);
    filteredItems.sort((a, b) => b.priority - a.priority); // Sort by priority in descending order
    result.push(filteredItems);
  }
  return result;
},


    groupedItems() {
      return this.uniqueStatuses.map(status => {
        return {
          status,
          items: this.baseData.filter(item => item.status === status),
        };
      });
    },

    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    },



  },
  mounted(){
    console.clear()
    let array = ["またいつか","未着手","すぐ","今日絶対","対応中","待機中","完了",]
    
    array.forEach((name) => {
      this.baseData.push({
        title: "管理用データ（消さないで）",
        status: name,
        createdAt: "1999年6月2日 18:55",
        duration: 0,
        deadline: "",
        hidden: true
      });
    });
  

  }
}
</script>

<style>
html{
  background: #282c34;
  color:#f5f5f5 !important;
}
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: 'Noto Sans JP', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  margin-top: 60px;
}

.wrapper{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10%, 1fr));
  grid-gap: 15px;

  width:95%;
  margin: auto;
}

.wrapper ul{
  list-style-type: none;
  padding-inline-start: 0px !important;

  text-align: left;
  font-size: 14px;
}

/* .wrapper ul.hovered:hover{
  background: #363b47;
  transition: all .3s ease-in-out;
} */

.wrapper ul .status-title{
  
  /* background-color: red; */
  border-radius: 2px;
  padding: 3.5px 5px;
  position: relative;
  margin-right: 10px;
}

.wrapper ul li{
    position: relative; 
    /* border: 2px solid #FF5733; */
    background: #5b5f6f;
    padding: 15px;
    margin: 10px auto;
    border-radius: 5px;
    word-break: break-all;
    color: #fffff0;
    font-weight: bold;
    
    cursor: pointer;
    font-size: 14px !important;


    transition: all 0.2s ease-in-out; /* Modified for box-shadow and transform */
    overflow: hidden; /* Added to contain the pseudo-elements within the list item */

}



.wrapper ul li::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  pointer-events: none;
  transition: none;
}

.wrapper ul li:hover {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
}

.wrapper ul li:hover::before {
  left: 0;
  transition: left 0.4s;
}


.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}


</style>
