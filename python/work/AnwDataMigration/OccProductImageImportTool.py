'''
Created on Jul 20, 2015
Tested with Python 2.7.10 and Python 3.4.3

@author: I070680
'''

import sys
import re
import json
import requests
from requests import packages
packages.urllib3.disable_warnings()

'''                                                Initial settings                                                '''
cookie = 'JSESSIONID=B290C37D77EA13402D683C4F9CE97E76; TICKET_CODE="U7PAlp1iK70dQM6UmleByKzIhLJdR1LLVrfEm33ktpaRw2WHfchi+CCYtg9anFaRVFTC6BRAZRfNymUv3b8OiA=="; saproute=89a070d32c15dab821981c65a8467ec2; _ga=GA1.2.669031895.1433471955; Security-Token=484OLAYV6LD7LBZQKTCNCBCNKDUJST'
occBaseUrl = 'https://eap-occ-cn.sapanywhere.cn/sbo'                                # Ends with '/sbo'
imageFileFolder= 'c:/Users/I070680/Downloads/product-picture-migration/image/'      # Use the forward slash '/' and ends with '/'
productCodeImageMapFilePath = 'c:/Users/I070680/Downloads/product-picture-migration/ProductImageMap.csv'
'''                                                                                                              '''

def getSecurityToken(cookie):    
    securityTokenSearch = re.search('Security-Token=([a-zA-Z0-9]+)', cookie)
    if securityTokenSearch:
        return securityTokenSearch.group(1)
    else:
        print('### Error: No Security Token found, please check the cookie setting.')
        sys.exit()
        
def getProductImageMap(productCodeImageMapFilePath):
    ''' line format: ItemCode1,ImageName1,ImageName2,ImageName3,... '''
    mapFile = open(productCodeImageMapFilePath, 'r')
    productCodeImageList = []
    for line in mapFile:
        values = line.split(',')
        if len(values) < 2:
            print('### Error: Please check the map file, which is NOT in a correct format on this line: ' + line)
            sys.exit()
        
        productCodeImage = []
        for i in range(len(values)):
            productCodeImage.append(values[i].strip())
        productCodeImageList.append(productCodeImage)
    mapFile.close()
    return productCodeImageList
    
def getProductCodeGalleryIdMap():
    url = occBaseUrl + '/Product'
    headers = {'Accept': 'application/json', 'Cookie': cookie}
    params = {'$inlinecount': 'allpages', '$select': 'code,galleryId', '$orderby': 'code desc'}
    r = requests.get(url, headers=headers, params=params, verify=False)
    if str(r).find('[200]') < 0:
        print('### Error: Cannot access this URL, please check it: ' + url)
        sys.exit()
    
    result = json.loads(r.text)
    odataCount = result['odata.count']
    products = result['value']
    productCount = len(products)
    productCodeGalleryIdMap = {}
    for i in range(len(products)):
        code = str((products[i])['code'])
        galleryId = int((products[i])['galleryId'])
        productCodeGalleryIdMap[code] = galleryId
        
    while productCount < odataCount:
        params['$skip'] = productCount
        r = requests.get(url, headers=headers, params=params, verify=False)
        if str(r).find('[200]') < 0:
            print('### Error: Cannot access this URL, please check it: ' + url)
            sys.exit()
            
        result = json.loads(r.text)
        products = result['value']
        for i in range(len(products)):
            code = str((products[i])['code'])
            galleryId = int((products[i])['galleryId'])
            productCodeGalleryIdMap[code] = galleryId
        productCount = productCount + len(products)
        
    return productCodeGalleryIdMap

def upload(fileNameList, securityToken):
    url = occBaseUrl + '/file/upload'
    headers = {'Accept': '*/*', 'Cookie': cookie, 'Security-Token': securityToken}
    attachmentIdList = []
    for fileName in fileNameList:
        dotIndex = fileName.rfind('.')
        if dotIndex > 1:
            ext = fileName[dotIndex+1:]
            mimeType = 'image/' + ext
            files = {'file': (fileName, open(imageFileFolder + fileName, 'rb'), mimeType)}
            r = requests.post(url, files=files, headers=headers, verify=False)
            if str(r).find('[200]') < 0:
                print('### Error: Cannot access this URL, please check it: ' + url)
                return []
            attachmentIdList.append(int(r.text))
    return attachmentIdList
    
def bindGalleryImage(galleryId, attachmentIdList, securityToken):
    url = occBaseUrl + '/Gallery(' + str(galleryId) + ')/bindGalleryImage'
    headers = {'Accept': 'application/json', 'Cookie': cookie, 'Security-Token': securityToken}
    for attachmentId in attachmentIdList:
        payload = {"attachmentId": attachmentId}
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=False)
        if str(r).find('[200]') < 0:
            print('### Error: Cannot access this URL, please check it: ' + url)
            return False
    return True
    
def attachGalleryAttachments(galleryId, attachmentIdList, securityToken):
    url = occBaseUrl + '/Gallery(' + str(galleryId) + ')/attachGalleryAttachments'
    headers = {'Accept': 'application/json', 'Cookie': cookie, 'Security-Token': securityToken}
    payload = {"attachmentIds": attachmentIdList}
    r = requests.post(url, headers=headers, data=json.dumps(payload), verify=False)
    if str(r).find('[204]') < 0:
        print('### Error: Cannot access this URL, please check it: ' + url)
        return False
    return True
    
def saveGallery(galleryId, attachmentIdList, securityToken):    
    url = occBaseUrl + '/Gallery(' + str(galleryId) + ')/saveGallery'
    headers = {'Accept': 'application/json', 'Cookie': cookie, 'Security-Token': securityToken}
    payloadStr = '{"galleryInfo":{"id":1,"variants":[],"channels":[],"imageQuantity":0,"enableVariantAttachment":false,"variantAttachments":[],"productAttachments":['
    
    i = 0
    for attachmentId in attachmentIdList:
        if i == 0:
            payloadStr = payloadStr + '{"id":null,"galleryId":' + str(galleryId) + ',"channelId":-1,"sequence":' + str(i) + ',"isOfflineChannel":false,"attachment":{"id":' + str(attachmentId) + '},"isMainImage":true}'
        else:
            payloadStr = payloadStr + ',{"id":null,"galleryId":' + str(galleryId) + ',"channelId":-1,"sequence":' + str(i) + ',"isOfflineChannel":false,"attachment":{"id":' + str(attachmentId) + '},"isMainImage":false}'
        i = i + 1 
    payloadStr = payloadStr + '],"dominateVariantId":null,"galleryAttachments":[],"enableAdvanced":false,"skuDisabled":true,"imageTotalSize":0}}'
    payload = json.loads(payloadStr)
    r = requests.post(url, headers=headers, data=json.dumps(payload), verify=False)
    if str(r).find('[200]') < 0:
        print('### Error: Cannot access this URL, please check it: ' + url)
        return False
    return True
    
def updateProductPicture(galleryId, fileNameList, securityToken):
    # Step 1. upload image as attachment
    attachmentIdList = upload(fileNameList, securityToken)
    if len(attachmentIdList) == 0:
        return False
    
    # Step 2: add attachment
    if not bindGalleryImage(galleryId, attachmentIdList, securityToken):
        return False
    
    # Step 3: bind image to gallery
    if not attachGalleryAttachments(galleryId, attachmentIdList, securityToken):
        return False
    
    # Step 4: save gallery
    if not saveGallery(galleryId, attachmentIdList, securityToken):
        return False
    
    return True
    
''' main procedure '''
try:
    print('Prepare initial data...')
    securityToken = getSecurityToken(cookie)
    productCodeImageList = getProductImageMap(productCodeImageMapFilePath)
    productCodeGalleryIdMap = getProductCodeGalleryIdMap()
    print('Begin product image import one by one...')
    for productCodeImage in productCodeImageList:
        productCode = productCodeImage[0]
        if productCode not in productCodeGalleryIdMap:
            print('### Error: Product ' + productCode + ' not found, please check it.')
            continue
        
        fileNameList = []
        for i in range(1, len(productCodeImage)):
            fileNameList.append(productCodeImage[i])
        galleryId = productCodeGalleryIdMap[productCode]
        if updateProductPicture(galleryId, fileNameList, securityToken):
            print('Successfully import image(s) for product: ' + productCode)
        else:
            print('@@@ Failed to import image(s) for product: ' + productCode + ', you can edit the map file and try to continue the import.')
            break
    print('End product image import!')
except Exception as e:
    print('@@@ Exception occurs: ')
    print(str(e))
    print('@@@ The exception type is: ' + str(type(e)))
