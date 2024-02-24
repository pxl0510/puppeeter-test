 
const openPage = require('./openPage');
const {
  sleep,
  genScriptContent,
} = require("./util");
const {
  saveScreenShot,
} = require('./saveFile');
const insertSkeleton = require('./insertSkeleton');

(async () => { 
  const options={
    pageUrl:'https://i.alibaba.com/ncms/pages/cnfm_v2.html',
    outputPath:'out',
    cookies:{
      'XSRF-TOKEN':"a33b7049-a277-486c-abf6-3aff0e35bd3f",
      "cna": "gKk5HWYT1jMCASSheC8vw+uR",
      "_fbp": "fb.1.1708743705573.599997790",
      "_ga": "GA1.1.1654941348.1708733933",
      "_ga_GKMVMVMZNM": "GS1.1.1708733932.1.1.1708734410.0.0.0",
      "_ga_RVSKK1KF5N": "GS1.1.1708743705.1.0.1708743705.60.0.0",
      "_hvn_login": "4",
      "_m_h5_tk": "77db88a07e4fd285cc579df96ecb8a5d_1708759102883",
      "_m_h5_tk_enc": "6ffb200407e6187affb92c62d4d0573c",
      "_samesite_flag_": "true",
      "_tb_token_": "5f7a31e937de3",
      "_ym_d": "1708743705",
      "_ym_isad": "2",
      "_ym_uid": "1708743705424119752",
      "acs_t": "9K8IpZ3YmzLd/YkzgT87W3XcTmm4S3Zdi9ZwmY3Xn6fE1K+0WGy4gsL5TwV/AjlJ",
      "acs_usuc_t": "acs_rt",
      "ali_apache_id": "33.102.195.130.1700031658890.360086.1",
      "ali_apache_tracktmp": "W_signed",
      "cbc": "G19C29F775811A8A352FD3820B6B8507E198B2C2CCC4E5F79C6",
      "cookie2": "10951d82a317b6f126a938c7163c5678",
      "cto_bundle": "G08zM19WN2VLVjhxUVJXUW9zUXNna3FhbTlXemtMY2hqMDJOWXBSYzY0WFdHM29xRDVnMjd6R1l5MGZRSUczaGclMkJBSFVhcjZYS2dOeDBpWmpGTUxBTFdTR015eGVCNll3JTJCR2VEJTJGQmJydEJTUkRMU2Fod21FS01pd0ZjaDNwcU1hQUYzVU5mVHh5NE5ZNDZkVXdvbE50Y2ZUS0ElM0QlM0Q",
      "intl_common_forever": "AiU2ncHq3b0ZNsg8EaU5LuEXXa2bKPnvTS6nzTFgMcatux3eqGxQ4g",
      "intl_locale": "zh_CN",
      "l": "fBr-3qpPPOlginJZBOfZhurza77OOIRY6uPzaNbMi9fP_z5B5khCW1CwjZL6CnhVF6ywR3yI_B6WBeYBcQd-nxv9p4_qpqMmndLHR35..",
      "recommend_login": "email",
      "sgcookie": "E100heVYRmuM9h5Vn37UTetWnA%2FfBlSeHdud7NeEw%2FtoxVHHtmEcYkep4GTCSBD3GHnqDqvlim6glrj5l%2BLVpUFZOyjjjduxMzg8NibBTborCCs%3D",
      "t": "f7cc685a47168e137cb8b75e3ae14be6",
      "uns_unc_f": "trfc_i",
      "xlly_s": "1",
      "xman_f": "7DCrOHnZWJ2d46hQR8+TSNBewYgG/gzsEKfzNZQ/xlMRnHR23vmkjndtgmHwE7sFp0b5jDvC90QQiPWU3/QWfAF2wPJdPoC7utQMaoBbYxHGaMD1UftUpkqFHP+hRkaEs+aGZYYaux/HPPTDOOaxafwtx3vdBVutM2roZaLJ+mVNVz3jxllq2yno06XEMehhiv1uJPv83NFCFgatglKZ2MkLbwx8s4awzwYgLSJuOhxxqr/tOJB4MXXKEDgpgkSzWZ9g1/2rwCtxOSFP6UUWGgJX4QJ6mlpKoatihpCPmfQ",
      "xman_i": "aid",
      "xman_us_f": "x_locale",
      "xman_us_t": "l_source",
      "_bl_uid": "p1lajsspzvqm2R477c3RtvIe40ys",
      "_m_h5_c": "6fabe1f4aed2651c82ee5a839a1d0d3e_1708763395078%3B2568884a13018cbdc4192053534ef54b",
      "ali_apache_track": "ms",
      "icbu_s_tag": "9_11",
      "ug_se_c": "organic_1708753364994",
      "csg": "9258fb7e",
      "xman_t": "i97mbYKD2PN/Bv29+Ty0F/y+ZE2q+G06DiQ8WoRkAD+FDD8lQmwyBsc/WAdadj7e9ACGgJ+7kX783Y91Y6nnUg6FzZkhRSS+2oI5bWrhF4rUHjtU8X0nHjDJqFdsVPuWEo+NGYxHS16Gq1GBHk9DJEkMb+gEJiJQ1poXQDvmpKjYypco1GDt3USOkxFXtTJdmN3fNS2uXgAOET0+7ViKKbqbi9nm0sMOJoqrkItz4KBMBJUkdATyOTY2K28SVVTsNj2i4bCkR6Yb7wo+wvs2ynGn+mqemK8gqvWyx0Ae6JIJlcRqmSaVOMSaU3vf2XFEgmAneSUhH50wMjJnLAeplcvbnK5bN8Xsd9TzORU+hxKBy3Yc7DCngQ8EIamtVSDkEhxTvj8WkS4+yaCc+t2yDQEg3gbyxE64k4ykQtUpzWn12epQREK/8h+BUvgu4wz1wj5VnzufmObUjuGmJI1ceDh+YyVnIqdFnxvEtfp2sdIfOeuYBUpKOaOatxnVcbcL6ZFWuybxF02qIVOpx4A4Vb8uSQnBEqK71g+HzQ+Ray2AVySuejqAZXm0+Yl883kKtTAJepOZK1oskXfRrGzV8OEP6Y+qOXxbOi83XKjmZZ+11jb3gLs7AmtPpiYMiGM76YxkXkWFTKI",
      "JSESSIONID": "01B51C03C647D41F25456F1FEEF3ABC9",
      "isg": "BJubhyPeevsaxobUC3tPpmAkKvkFcK9yhXTTJY3YoBogbLpOD0MAwgivBsxizAdq",
      "tfstk": "edGJV3XE_EQJXMsanQpmTCxQj2LD2b3rM0u1tkqldmnxqoYztYvU9Jn3mbqor7MLvm0UVkvrZ6EQcDynK4APd-ZxV62oxXHV9VuEZUPHz7uzTWtMjCcKz4PeFW5m5CmMxfCkjhAMijqDDHxiEt-udiCP6OC1-_n-sz91kTPPZjI7A8EskdWlULz5jl35z6CIMxe8fBEAO6GYyguisfFmZGqT-TTvk9WUFrydI-eDqKoU9rEMozXFL-p4klYvk9WUFrzYjE4lL9yv3"
  }
  }
  const { page, browser } = await openPage(options);

   
  const scriptContent = await genScriptContent(); 
  await page.addScriptTag({ content: scriptContent });
  await page.evaluate(async options => {
    await window.AwesomeSkeleton.genSkeleton(options);
  }, options);

    // Screenshot and save as png and base64 txt files
    const skeletonImageBase64 = await saveScreenShot(page, options);

    // Inject the skeleton into the desired page
    const result = insertSkeleton(skeletonImageBase64, options);
  
    // Close the browser
    // await browser.close();
  
    return result;

  // await page.screenshot({path: 'example1.png'});

  // await browser.close();
})();