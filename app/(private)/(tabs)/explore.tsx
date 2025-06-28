import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

const OmrDownload = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 900;

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={[styles.container, isMobile && { flexDirection: 'column', gap: 24 }]}>
        {/* Left Card: Exam Info */}
        <View style={[styles.card, styles.leftCard, isMobile && { width: '100%' }]}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>OMR ডাউনলোড</Text>
            <View style={styles.languageToggleRow}>
              <TouchableOpacity style={styles.languageBtn}><Text style={styles.languageBtnText}>Bangla</Text></TouchableOpacity>
              <TouchableOpacity style={styles.languageBtn}><Text style={styles.languageBtnText}>English</Text></TouchableOpacity>
            </View>
          </View>
          <View style={styles.infoFields}>
            <View style={styles.infoFieldRow}><Text style={styles.infoLabel}>পরীক্ষার নাম:</Text><View style={styles.underline} /></View>
            <View style={styles.infoFieldRow}><Text style={styles.infoLabel}>বিষয়:</Text><View style={styles.underline} /></View>
            <View style={styles.infoFieldRow}><Text style={styles.infoLabel}>শ্রেণি:</Text><View style={styles.underline} /></View>
            <View style={styles.infoFieldRow}><Text style={styles.infoLabel}>রোল:</Text><View style={styles.underline} /></View>
            <View style={styles.infoFieldRow}><Text style={styles.infoLabel}>তারিখ:</Text><View style={styles.underline} /></View>
            <View style={styles.infoFieldRow}><Text style={styles.infoLabel}>মোট প্রশ্ন:</Text><Text style={styles.infoValue}>৫০</Text></View>
          </View>
        </View>
        {/* Right Card: OMR Preview & Buttons */}
        <View style={[styles.card, styles.rightCard, isMobile && { width: '100%' }]}>
          <View style={styles.previewCard}>
            <Text style={styles.previewTitle}>ধারিকা</Text>
            <View style={styles.previewFields}>
              <View style={styles.previewFieldRow}><Text style={styles.previewLabel}>নাম:</Text><View style={styles.underline} /></View>
              <View style={styles.previewFieldRow}><Text style={styles.previewLabel}>রোল:</Text><View style={styles.underline} /></View>
              <View style={styles.previewFieldRow}><Text style={styles.previewLabel}>বিষয়:</Text><View style={styles.underline} /></View>
              <View style={styles.previewFieldRow}><Text style={styles.previewLabel}>সেট:</Text><View style={styles.underline} /></View>
            </View>
            <View style={styles.omrBox}><Text style={styles.omrBoxText}>[OMR Sheet Preview]</Text></View>
            <Text style={styles.omrSheetLabel}>OMR sheet</Text>
          </View>
          <View style={styles.buttonCol}>
            <TouchableOpacity style={styles.downloadBtn}>
              <Text style={styles.downloadBtnText}>Download PDF</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.downloadBtn}>
              <Text style={styles.downloadBtnText}>Download Doc</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', padding: 24, gap: 24, justifyContent: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#bbb', padding: 24, minWidth: 320, maxWidth: 500, flex: 1 },
  leftCard: { marginRight: 0 },
  rightCard: { alignItems: 'flex-end', justifyContent: 'space-between', flexDirection: 'row', gap: 16 },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  cardTitle: { fontSize: 24, fontWeight: 'bold' },
  languageToggleRow: { flexDirection: 'row', gap: 8 },
  languageBtn: { paddingVertical: 4, paddingHorizontal: 12, borderWidth: 1, borderColor: '#aaa', borderRadius: 8, marginLeft: 8 },
  languageBtnText: { fontSize: 14 },
  infoFields: { marginTop: 8 },
  infoFieldRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  infoLabel: { fontSize: 16, minWidth: 90 },
  infoValue: { fontSize: 16, fontWeight: 'bold', marginLeft: 8 },
  underline: { flex: 1, borderBottomWidth: 1, borderBottomColor: '#aaa', marginLeft: 8, height: 16 },
  previewCard: { flex: 1, alignItems: 'center', width: '70%' },
  previewTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  previewFields: { width: '100%', marginBottom: 16 },
  previewFieldRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  previewLabel: { fontSize: 16, minWidth: 60 },
  omrBox: { width: '100%', height: 60, borderWidth: 1, borderColor: '#bbb', borderRadius: 8, backgroundColor: '#f7f7f7', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  omrBoxText: { color: '#888' },
  omrSheetLabel: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  buttonCol: { justifyContent: 'flex-start', alignItems: 'flex-end', marginLeft: 16 },
  downloadBtn: { backgroundColor: '#e0e7ff', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 24, marginBottom: 12, minWidth: 160, alignItems: 'center' },
  downloadBtnText: { fontWeight: 'bold', fontSize: 16 },
});

export default OmrDownload;
