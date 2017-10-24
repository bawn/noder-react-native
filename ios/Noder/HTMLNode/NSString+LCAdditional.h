//
//  NSString+LCAdditional.h
//  Test
//
//  Created by bawn on 31/03/2017.
//  Copyright © 2017 bawn. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NSString (LCAdditional)


/**
 删除首尾的换行符

 @return 首尾没有换行符的字符串
 */
- (NSString *)stringDeleteHTLineFeed;

@end
