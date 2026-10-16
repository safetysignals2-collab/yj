const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./config/config.json');

const app = express();
const PORT = config.port || 400;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`\n[APEX TELEMETRY] 🕒 ${timestamp} | [${req.method}] ${req.originalUrl} | IP: ${req.ip}`);
    next();
});

const accountRoutes = require('./routes/account');
const profileRoutes = require('./routes/profile');
const contentRoutes = require('./routes/content');
const timelineRoutes = require('./routes/timeline');
const storefrontRoutes = require('./routes/storefront');
const discoveryRoutes = require('./routes/discovery');
const hotfixesRoutes = require('./routes/hotfixes');
const cloudstorageRoutes = require('./routes/cloudstorage');
const datarouterRoutes = require('./routes/datarouter');
const gameRoutes = require('./routes/game');

app.use(accountRoutes);
app.use(profileRoutes);
app.use(contentRoutes);
app.use(timelineRoutes);
app.use(storefrontRoutes);
app.use(discoveryRoutes);
app.use(hotfixesRoutes);
app.use(cloudstorageRoutes);
app.use(datarouterRoutes);
app.use(gameRoutes);

app.get('/lightswitch/api/service/fortnite/status', (req, res) => {
    res.json({
        serviceInstanceId: "fortnite",
        status: "UP",
        message: "Apex Engine servers are online and operational.",
        maintenanceUri: "",
        overrideProperties: {},
        banned: false
    });
});

app.listen(PORT, () => {
    console.log(`\n🚀 [APEX ENGINE RUNNING ON PORT ${PORT}] الخادم يعمل الآن بنجاح على المنفذ 400!`);
    console.log(`🛡️ تمت إضافة نقطة VersionCheck والمسارات المساعدة لتجاوز شاشة تسجيل الدخول نهائياً.`);
});